'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import StepServicePicker, { type Service } from './StepServicePicker'
import StepStylistPicker, { type Stylist } from './StepStylistPicker'
import StepDateTimePicker from './StepDateTimePicker'
import StepClientForm, { type ClientData } from './StepClientForm'
import { Check, Scissors } from 'lucide-react'

export interface BookingState {
  service: Service | null
  stylist: Stylist | 'any' | null
  date: Date | null
  timeSlot: string | null // "HH:mm"
  client: ClientData | null
}

const STEPS = ['Servicio', 'Peluquero', 'Fecha y hora', 'Tus datos']

export default function BookingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [booking, setBooking] = useState<BookingState>({
    service: null,
    stylist: null,
    date: null,
    timeSlot: null,
    client: null,
  })

  const canGoNext = (): boolean => {
    if (step === 0) return booking.service !== null
    if (step === 1) return booking.stylist !== null
    if (step === 2) return booking.date !== null && booking.timeSlot !== null
    return false
  }

  const handleConfirm = async (clientData: ClientData) => {
    if (!booking.service || !booking.date || !booking.timeSlot) return

    setSubmitting(true)

    // Build appointment datetime from selected date + time slot
    const [hours, minutes] = booking.timeSlot.split(':').map(Number)
    const appointmentDate = new Date(booking.date)
    appointmentDate.setHours(hours, minutes, 0, 0)

    const stylistId =
      booking.stylist === 'any' || booking.stylist === null
        ? 'any'
        : booking.stylist.id

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: booking.service.id,
          stylistId,
          date: appointmentDate.toISOString(),
          clientName: clientData.name,
          clientPhone: clientData.phone,
          clientEmail: clientData.email || '',
          notes: clientData.notes || '',
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || 'Hubo un problema. Intentá de nuevo.')
        setSubmitting(false)
        return
      }

      const appointment = await res.json()

      // Navigate to confirmation page with appointment data
      const params = new URLSearchParams({
        id: appointment.id,
        service: booking.service.name,
        stylist: appointment.stylist?.name || 'Cualquier peluquero',
        date: appointmentDate.toISOString(),
        client: clientData.name,
      })
      router.push(`/confirmacion?${params.toString()}`)
    } catch {
      toast.error('Hubo un problema. Intentá de nuevo.')
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10 px-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  i < step
                    ? 'bg-[#c9a84c] text-[#0f0f0f]'
                    : i === step
                    ? 'bg-gradient-to-br from-[#c9a84c] to-[#b87333] text-[#0f0f0f] shadow-lg shadow-[#c9a84c]/30'
                    : 'bg-[#2a2a2a] text-[#a0a0a0]'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium whitespace-nowrap ${
                  i === step ? 'text-[#c9a84c]' : i < step ? 'text-[#a0a0a0]' : 'text-[#3a3a3a]'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 mt-[-18px] transition-all duration-500 ${
                  i < step ? 'bg-[#c9a84c]' : 'bg-[#2a2a2a]'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="animate-[slideUp_0.3s_ease-out]">
        {step === 0 && (
          <StepServicePicker
            selected={booking.service}
            onSelect={(s) => setBooking({ ...booking, service: s })}
          />
        )}
        {step === 1 && (
          <StepStylistPicker
            selected={booking.stylist}
            onSelect={(s) => setBooking({ ...booking, stylist: s })}
          />
        )}
        {step === 2 && (
          <StepDateTimePicker
            service={booking.service!}
            stylist={booking.stylist}
            selectedDate={booking.date}
            selectedTime={booking.timeSlot}
            onSelect={(date, time) =>
              setBooking({ ...booking, date, timeSlot: time })
            }
          />
        )}
        {step === 3 && (
          <StepClientForm
            booking={booking}
            submitting={submitting}
            onConfirm={handleConfirm}
            onBack={() => setStep(2)}
          />
        )}
      </div>

      {/* Navigation */}
      {step < 3 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#2a2a2a]">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#a0a0a0] border border-[#2a2a2a] hover:border-[#3a3a3a] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Anterior
          </button>

          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canGoNext()}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#c9a84c]/20"
          >
            <Scissors className="w-4 h-4" />
            {step === 2 ? 'Continuar' : 'Siguiente'}
          </button>
        </div>
      )}
    </div>
  )
}
