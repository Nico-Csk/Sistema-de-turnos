'use client'

import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { type Service } from './StepServicePicker'
import { type BookingState } from './BookingWizard'
import { formatDate } from '@/lib/utils'
import { format, addDays, isBefore, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'

interface TimeSlot {
  startStr: string
  endStr: string
}

interface Props {
  service: Service
  stylist: BookingState['stylist']
  selectedDate: Date | null
  selectedTime: string | null
  onSelect: (date: Date, time: string) => void
}

const DAYS_TO_SHOW = 7

export default function StepDateTimePicker({
  service,
  stylist,
  selectedDate,
  selectedTime,
  onSelect,
}: Props) {
  const today = startOfDay(new Date())
  const [currentDate, setCurrentDate] = useState<Date>(
    selectedDate ? startOfDay(selectedDate) : today
  )
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [weekOffset, setWeekOffset] = useState(0)

  const stylistId =
    stylist === 'any' || stylist === null ? 'any' : (stylist as { id: string }).id

  const fetchSlots = useCallback(
    async (date: Date) => {
      setLoadingSlots(true)
      setSlots([])
      const dateStr = format(date, 'yyyy-MM-dd')
      const res = await fetch(
        `/api/availability?stylistId=${stylistId}&serviceId=${service.id}&date=${dateStr}`
      )
      if (res.ok) {
        const data = await res.json()
        setSlots(data)
      }
      setLoadingSlots(false)
    },
    [stylistId, service.id]
  )

  useEffect(() => {
    fetchSlots(currentDate)
  }, [currentDate, fetchSlots])

  // Generate the days for the current week strip
  const startDay = addDays(today, weekOffset * 7)
  const days = Array.from({ length: DAYS_TO_SHOW }, (_, i) => addDays(startDay, i))

  const selectDate = (date: Date) => {
    setCurrentDate(date)
  }

  const handleSlotClick = (slot: TimeSlot) => {
    onSelect(currentDate, slot.startStr)
  }

  const isSelectedDate = (d: Date) =>
    d.toDateString() === currentDate.toDateString()

  const isPast = (d: Date) => isBefore(d, today)

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Elegí fecha y hora</h2>
      <p className="text-[#a0a0a0] text-sm mb-6">
        Seleccioná el día y el horario que te viene mejor
      </p>

      {/* Date strip */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
            disabled={weekOffset === 0}
            className="p-1.5 rounded-lg text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a] disabled:opacity-0 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-[#a0a0a0] capitalize">
            {format(startDay, 'MMMM yyyy', { locale: es })}
          </span>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            disabled={weekOffset >= 3}
            className="p-1.5 rounded-lg text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a] disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const past = isPast(day)
            const selected = isSelectedDate(day)
            return (
              <button
                key={day.toISOString()}
                onClick={() => !past && selectDate(day)}
                disabled={past}
                className={`flex flex-col items-center py-3 px-1 rounded-xl text-center transition-all duration-200 min-h-[52px] ${
                  past
                    ? 'opacity-20 cursor-not-allowed'
                    : selected
                    ? 'bg-gradient-to-b from-[#c9a84c] to-[#b87333] text-[#0f0f0f] shadow-lg shadow-[#c9a84c]/20'
                    : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#a0a0a0] hover:border-[#c9a84c]/40 hover:text-white'
                }`}
              >
                <span className="text-[10px] uppercase font-medium">
                  {format(day, 'EEE', { locale: es }).slice(0, 3)}
                </span>
                <span className={`text-base font-bold mt-0.5 ${selected ? 'text-[#0f0f0f]' : ''}`}>
                  {format(day, 'd')}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected date label */}
      <p className="text-sm text-[#a0a0a0] mb-3 capitalize">
        {formatDate(currentDate)}
      </p>

      {/* Time slots */}
      {loadingSlots ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-[#c9a84c] animate-spin" />
          <span className="ml-2 text-[#a0a0a0] text-sm">Buscando turnos disponibles...</span>
        </div>
      ) : slots.length === 0 ? (
        <div className="flex items-center justify-center py-8 rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a]">
          <p className="text-[#a0a0a0] text-sm">No hay turnos disponibles para este día</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.map((slot) => {
            const isActive = selectedTime === slot.startStr
            return (
              <button
                key={slot.startStr}
                onClick={() => handleSlotClick(slot)}
                className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-br from-[#c9a84c] to-[#b87333] text-[#0f0f0f] shadow-md shadow-[#c9a84c]/20'
                    : 'bg-[#1a1a1a] border border-[#2a2a2a] text-white hover:border-[#c9a84c]/40 hover:bg-[#1f1f1f]'
                }`}
              >
                {slot.startStr}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
