'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Calendar, Scissors, User, Clock, ChevronRight, Download, XCircle } from 'lucide-react'
import { formatDate, formatTime, capitalize } from '@/lib/utils'

export default function ConfirmacionPage() {
  const params = useSearchParams()

  const id = params.get('id') || ''
  const service = params.get('service') || ''
  const stylist = params.get('stylist') || 'Cualquier peluquero'
  const dateStr = params.get('date') || ''
  const client = params.get('client') || ''
  const token = params.get('token') || ''

  const date = dateStr ? new Date(dateStr) : null

  const buildICS = () => {
    if (!date) return
    const dtStart = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const dtEnd = new Date(date.getTime() + 60 * 60000)
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0] + 'Z'

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:Turno en Tu Peluquería — ${service}`,
      `DESCRIPTION:Con ${stylist}`,
      'LOCATION:Tu Peluquería',
      `UID:${id}@tupeluqueria.com`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'turno-peluqueria.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  const buildGoogleCalendarUrl = () => {
    if (!date) return '#'
    const dtStart = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const dtEnd = new Date(date.getTime() + 60 * 60000)
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0] + 'Z'

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Turno en Tu Peluquería — ${service}`,
      dates: `${dtStart}/${dtEnd}`,
      details: `Con ${stylist}`,
      location: 'Tu Peluquería',
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Success animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center animate-[fadeIn_0.6s_ease-out]">
              <CheckCircle className="w-12 h-12 text-[#c9a84c]" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-0 rounded-full bg-[#c9a84c]/5 animate-ping" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">¡Turno confirmado!</h1>
          <p className="text-[#a0a0a0]">
            {client ? `Gracias, ${client}. ` : ''}Te esperamos en Tu Peluquería.
          </p>
        </div>

        {/* Booking detail card */}
        <div className="bg-[#1a1a1a] border border-[#c9a84c]/20 rounded-2xl p-5 mb-6 space-y-3">
          {[
            { icon: <Scissors className="w-4 h-4" />, label: 'Servicio', value: service },
            { icon: <User className="w-4 h-4" />, label: 'Peluquero', value: stylist },
            date && {
              icon: <Calendar className="w-4 h-4" />,
              label: 'Fecha',
              value: capitalize(formatDate(date)),
            },
            date && {
              icon: <Clock className="w-4 h-4" />,
              label: 'Hora',
              value: formatTime(date),
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
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href={buildGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-[#0f0f0f] bg-gradient-to-r from-[#c9a84c] to-[#b87333] hover:from-[#e0c068] hover:to-[#c9a84c] transition-all shadow-lg shadow-[#c9a84c]/20"
          >
            <Calendar className="w-4 h-4" />
            Agregar a Google Calendar
          </a>

          <button
            onClick={buildICS}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all"
          >
            <Download className="w-4 h-4" />
            Descargar .ics (Apple/Outlook)
          </button>

          {token && (
            <Link
              href={`/mi-turno?token=${token}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
            >
              <XCircle className="w-4 h-4" />
              Cancelar turno
            </Link>
          )}

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium text-[#a0a0a0] border border-[#2a2a2a] hover:border-[#3a3a3a] hover:text-white transition-all"
          >
            Volver al inicio
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
