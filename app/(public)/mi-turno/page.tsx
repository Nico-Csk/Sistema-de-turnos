'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, User, Scissors, Loader2, XCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface AppointmentData {
  id: string
  date: string
  status: string
  clientName: string
  service: { name: string; duration: number; price: number }
  stylist: { name: string }
}

function MiTurnoContent() {
  const params = useSearchParams()
  const token = params.get('token')

  const [appointment, setAppointment] = useState<AppointmentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Link inválido')
      setLoading(false)
      return
    }

    fetch(`/api/appointments/cancel?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setAppointment(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Error al cargar el turno')
        setLoading(false)
      })
  }, [token])

  const handleCancel = async () => {
    if (!token) return
    setCancelling(true)

    try {
      const res = await fetch('/api/appointments/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
      } else {
        setCancelled(true)
      }
    } catch {
      setError('Error al cancelar el turno')
    } finally {
      setCancelling(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin" />
      </main>
    )
  }

  if (error && !appointment) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">No encontramos tu turno</h1>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333]"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

  if (cancelled) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-[#c9a84c] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Turno cancelado</h1>
          <p className="text-[#a0a0a0] mb-6">Tu turno ha sido cancelado correctamente.</p>
          <Link
            href="/reservar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333]"
          >
            Reservar nuevo turno
          </Link>
        </div>
      </main>
    )
  }

  const date = appointment ? new Date(appointment.date) : null
  const isPast = date ? date < new Date() : false
  const isConfirmed = appointment?.status === 'confirmed'

  return (
    <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tu turno</h1>
          <p className="text-[#a0a0a0]">Hola, {appointment?.clientName}</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#c9a84c]/20 rounded-2xl p-5 mb-6 space-y-3">
          {[
            { icon: <Scissors className="w-4 h-4" />, label: 'Servicio', value: appointment?.service.name },
            { icon: <User className="w-4 h-4" />, label: 'Peluquero', value: appointment?.stylist.name },
            date && {
              icon: <Calendar className="w-4 h-4" />,
              label: 'Fecha',
              value: format(date, "EEEE d 'de' MMMM", { locale: es }),
            },
            date && {
              icon: <Clock className="w-4 h-4" />,
              label: 'Hora',
              value: format(date, 'HH:mm'),
            },
          ]
            .filter(Boolean)
            .map((item: any) => (
              <div key={item.label} className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] shrink-0">
                  {item.icon}
                </div>
                <span className="text-[#a0a0a0] w-20 shrink-0">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}

          <div className="pt-3 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConfirmed ? 'bg-green-400' : appointment?.status === 'cancelled' ? 'bg-red-400' : 'bg-[#a0a0a0]'}`} />
              <span className={`text-sm font-medium ${isConfirmed ? 'text-green-400' : appointment?.status === 'cancelled' ? 'text-red-400' : 'text-[#a0a0a0]'}`}>
                {isConfirmed ? 'Confirmado' : appointment?.status === 'cancelled' ? 'Cancelado' : appointment?.status === 'completed' ? 'Completado' : 'Ausente'}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-sm text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {isConfirmed && !isPast && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
            >
              {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
              {cancelling ? 'Cancelando...' : 'Cancelar turno'}
            </button>
          )}

          <Link
            href="/reservar"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] transition-all shadow-lg shadow-[#c9a84c]/20"
          >
            {isConfirmed ? 'Reservar otro turno' : 'Reservar nuevo turno'}
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium text-[#a0a0a0] border border-[#2a2a2a] hover:border-[#3a3a3a] hover:text-white transition-all"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function MiTurnoPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin" />
      </main>
    }>
      <MiTurnoContent />
    </Suspense>
  )
}
