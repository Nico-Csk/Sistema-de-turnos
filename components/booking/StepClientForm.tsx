'use client'

import { useState } from 'react'
import { Loader2, User, Phone, Mail, StickyNote } from 'lucide-react'
import { z } from 'zod'
import { type BookingState } from './BookingWizard'
import { formatDate, formatPrice } from '@/lib/utils'
import { type Service } from './StepServicePicker'
import { type Stylist } from './StepStylistPicker'

export interface ClientData {
  name: string
  phone: string
  email: string
  notes: string
}

const clientSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  phone: z.string().min(6, 'El teléfono es obligatorio'),
  email: z.string().email('El email no es válido').or(z.literal('')),
  notes: z.string().optional().default(''),
})

interface Props {
  booking: BookingState
  submitting: boolean
  onConfirm: (data: ClientData) => void
  onBack: () => void
}

export default function StepClientForm({ booking, submitting, onConfirm, onBack }: Props) {
  const [form, setForm] = useState<ClientData>({
    name: '',
    phone: '',
    email: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<ClientData>>({})

  const handleChange = (field: keyof ClientData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const handleSubmit = () => {
    const result = clientSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<ClientData> = {}
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof ClientData
        fieldErrors[field] = e.message
      })
      setErrors(fieldErrors)
      return
    }
    onConfirm(result.data as ClientData)
  }

  const stylistName =
    booking.stylist === 'any' || booking.stylist === null
      ? 'Sin preferencia'
      : (booking.stylist as Stylist).name

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Tus datos</h2>
      <p className="text-[#a0a0a0] text-sm mb-6">Completá tus datos para confirmar el turno</p>

      {/* Summary */}
      <div className="bg-[#1a1a1a] border border-[#c9a84c]/20 rounded-2xl p-4 mb-6 text-sm">
        <p className="text-[#c9a84c] font-semibold mb-2 text-xs uppercase tracking-wide">Resumen del turno</p>
        <div className="grid grid-cols-2 gap-1.5 text-sm">
          <span className="text-[#a0a0a0]">Servicio</span>
          <span className="text-white font-medium">{booking.service?.name}</span>
          <span className="text-[#a0a0a0]">Precio</span>
          <span className="text-[#c9a84c] font-medium">{formatPrice(booking.service?.price ?? 0)}</span>
          <span className="text-[#a0a0a0]">Peluquero</span>
          <span className="text-white">{stylistName}</span>
          <span className="text-[#a0a0a0]">Fecha</span>
          <span className="text-white capitalize">{booking.date ? formatDate(booking.date) : '-'}</span>
          <span className="text-[#a0a0a0]">Hora</span>
          <span className="text-white">{booking.timeSlot ?? '-'}</span>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-[#a0a0a0] mb-1.5">
            <User className="w-3.5 h-3.5" />
            Nombre completo <span className="text-[#c9a84c]">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej: Juan Pérez"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border text-white placeholder-[#3a3a3a] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors ${
              errors.name ? 'border-red-500/50' : 'border-[#2a2a2a]'
            }`}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-[#a0a0a0] mb-1.5">
            <Phone className="w-3.5 h-3.5" />
            Teléfono / WhatsApp <span className="text-[#c9a84c]">*</span>
          </label>
          <input
            type="tel"
            placeholder="Ej: 11 2345-6789"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border text-white placeholder-[#3a3a3a] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors ${
              errors.phone ? 'border-red-500/50' : 'border-[#2a2a2a]'
            }`}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-[#a0a0a0] mb-1.5">
            <Mail className="w-3.5 h-3.5" />
            Email <span className="text-[#3a3a3a] text-xs">(opcional)</span>
          </label>
          <input
            type="email"
            placeholder="Ej: juan@email.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border text-white placeholder-[#3a3a3a] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors ${
              errors.email ? 'border-red-500/50' : 'border-[#2a2a2a]'
            }`}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-[#a0a0a0] mb-1.5">
            <StickyNote className="w-3.5 h-3.5" />
            Notas <span className="text-[#3a3a3a] text-xs">(opcional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="Ej: Cortame sólo las puntas"
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#3a3a3a] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#2a2a2a]">
        <button
          onClick={onBack}
          disabled={submitting}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#a0a0a0] border border-[#2a2a2a] hover:border-[#3a3a3a] hover:text-white transition-all"
        >
          Anterior
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-7 py-2.5 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#c9a84c]/20"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {submitting ? 'Confirmando...' : 'Confirmá tu turno'}
        </button>
      </div>
    </div>
  )
}
