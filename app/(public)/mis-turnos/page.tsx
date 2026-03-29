'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Search, Loader2, Calendar, Clock, Scissors, User, ChevronLeft } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface AppointmentResult {
  id: string
  date: string
  status: string
  clientName: string
  service: { name: string; duration: number; price: number }
  stylist: { name: string }
  cancelToken?: string
}

export default function MisTurnosPage() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState<AppointmentResult[] | null>(null)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 6) {
      setError('Ingresá al menos 6 dígitos de tu teléfono')
      return
    }

    setLoading(true)
    setError('')
    setAppointments(null)

    try {
      const res = await fetch(`/api/appointments/lookup?phone=${cleanPhone}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al buscar turnos')
      } else {
        setAppointments(data)
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-4 py-8">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-[#c9a84c] transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <h1 className="text-2xl font-bold text-white mb-2">Mis turnos</h1>
        <p className="text-[#a0a0a0] text-sm mb-6">Ingresá tu teléfono para ver tus turnos activos</p>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0a0]" />
            <input
              type="tel"
              placeholder="Tu teléfono..."
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#3a3a3a] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-5 py-3 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {appointments !== null && appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-[#3a3a3a] mx-auto mb-3" />
            <p className="text-[#a0a0a0]">No encontramos turnos activos con ese teléfono</p>
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333]"
            >
              Reservar turno
            </Link>
          </div>
        )}

        {appointments && appointments.length > 0 && (
          <div className="space-y-3">
            {appointments.map((appt) => {
              const date = new Date(appt.date)
              return (
                <div key={appt.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-[#c9a84c]" />
                      <span className="text-white font-semibold text-sm">{appt.service.name}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-medium">
                      Confirmado
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#a0a0a0]">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {appt.stylist.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(date, "d MMM", { locale: es })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {format(date, "HH:mm")}
                    </span>
                  </div>
                  {appt.cancelToken && (
                    <Link
                      href={`/mi-turno?token=${appt.cancelToken}`}
                      className="inline-flex items-center gap-1 text-xs text-[#c9a84c] hover:text-[#e0c068] transition-colors mt-1"
                    >
                      Ver detalles / cancelar
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
