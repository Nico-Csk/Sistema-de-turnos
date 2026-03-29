'use client'

import { useState, useEffect } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertTriangle, Loader2, MessageCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { buildWhatsAppLink, formatPrice } from '@/lib/utils'

export default function AgendaPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async (d: Date) => {
    setLoading(true)
    const dateStr = format(d, 'yyyy-MM-dd')
    const res = await fetch(`/api/admin/appointments?date=${dateStr}`)
    if (res.ok) {
      setAppointments(await res.json())
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAppointments(date)
  }, [date])

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (res.ok) {
      toast.success('Estado actualizado')
      fetchAppointments(date)
    } else {
      toast.error('Error al actualizar')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/20">Confirmado</span>
      case 'completed': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/20">Completado</span>
      case 'cancelled': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/20">Cancelado</span>
      case 'no_show': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-500/20">Ausente</span>
      default: return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Agenda</h1>
          <p className="text-[#a0a0a0]">Administrá los turnos del día</p>
        </div>

        {/* Date Navigator */}
        <div className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-2">
          <button
            onClick={() => setDate(subDays(date, 1))}
            className="p-2 rounded-lg text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-40 text-center">
            <span className="font-semibold text-white capitalize">
              {format(date, "EEE d 'de' MMM", { locale: es })}
            </span>
          </div>
          <button
            onClick={() => setDate(addDays(date, 1))}
            className="p-2 rounded-lg text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setDate(new Date())}
            className="px-3 py-1.5 ml-2 text-xs font-medium bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
          >
            Hoy
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl py-16">
            <span className="text-4xl mb-4 block">📅</span>
            <p className="text-[#a0a0a0]">No hay turnos para esta fecha.</p>
          </div>
        ) : (
          appointments.map((appt) => (
            <div key={appt.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 flex flex-col md:flex-row gap-6 md:items-center hover:border-[#c9a84c]/30 transition-colors">
              {/* Time */}
              <div className="flex flex-col items-center justify-center w-20 shrink-0 text-[#c9a84c] border-r border-[#2a2a2a] pr-6 border-b md:border-b-0 pb-4 md:pb-0">
                <span className="text-2xl font-bold">{format(new Date(appt.date), 'HH:mm')}</span>
                <span className="text-xs text-[#a0a0a0]">{appt.service?.duration} min</span>
              </div>
              
              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-white">{appt.clientName}</h3>
                  {getStatusBadge(appt.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-[#a0a0a0] mt-3">
                  <p><span className="text-white font-medium">Servicio:</span> {appt.service?.name}</p>
                  <p><span className="text-white font-medium">Peluquero:</span> {appt.stylist?.name}</p>
                  <p><span className="text-white font-medium">Precio:</span> {formatPrice(appt.service?.price || 0)}</p>
                  <p className="flex items-center gap-1">
                    <span className="text-white font-medium">Cel:</span> {appt.clientPhone}
                    <a
                      href={buildWhatsAppLink(appt.clientPhone, `Hola ${appt.clientName}, te escribimos de Tu Peluquería.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-green-400 hover:text-green-300 transition-colors"
                      title="Abrir WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </p>
                </div>
                
                {appt.notes && (
                  <p className="text-sm text-[#a0a0a0] mt-3 bg-[#0a0a0a] p-3 rounded-xl border border-[#2a2a2a]">
                    <span className="text-white font-medium block mb-1">Notas:</span>
                    {appt.notes}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-row md:flex-col gap-2 shrink-0 md:pl-4 md:border-l border-[#2a2a2a] pt-4 md:pt-0 mt-2 border-t md:border-t-0 md:mt-0">
                {appt.status === 'confirmed' && (
                  <>
                    <button
                      onClick={() => updateStatus(appt.id, 'completed')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-xl text-sm font-medium transition-colors border border-green-500/20"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Completar
                    </button>
                    <button
                      onClick={() => updateStatus(appt.id, 'cancelled')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-medium transition-colors border border-red-500/20"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancelar
                    </button>
                    <button
                      onClick={() => updateStatus(appt.id, 'no_show')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 rounded-xl text-sm font-medium transition-colors border border-gray-500/20"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Ausente
                    </button>
                    <a
                      href={buildWhatsAppLink(
                        appt.clientPhone, 
                        `Hola ${appt.clientName}, te recordamos tu turno para ${appt.service?.name} el día ${format(new Date(appt.date), "EEEE d 'de' MMMM", { locale: es })} a las ${format(new Date(appt.date), 'HH:mm')}. ¡Te esperamos!`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-[#0f0f0f] hover:bg-green-400 rounded-xl text-sm font-bold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Recordatorio
                    </a>
                  </>
                )}
                {appt.status !== 'confirmed' && (
                  <button
                    onClick={() => updateStatus(appt.id, 'confirmed')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#2a2a2a] text-[#a0a0a0] hover:text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    Marcar como pendiente
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
