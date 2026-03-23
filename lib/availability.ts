import prisma from '@/lib/db'
import { getDayKey, parseTime } from '@/lib/utils'

export interface TimeSlot {
  start: Date
  end: Date
  startStr: string // "HH:mm"
  endStr: string   // "HH:mm"
}

interface DaySchedule {
  start: string // "09:00"
  end: string   // "19:00"
}

interface WeekSchedule {
  mon?: DaySchedule | null
  tue?: DaySchedule | null
  wed?: DaySchedule | null
  thu?: DaySchedule | null
  fri?: DaySchedule | null
  sat?: DaySchedule | null
  sun?: DaySchedule | null
  [key: string]: DaySchedule | null | undefined
}

/**
 * Calculate available time slots for a given date, service and optionally a stylist.
 * If stylistId is 'any', returns union of slots across all active stylists.
 */
export async function getAvailableSlots(
  date: Date,
  serviceId: string,
  stylistId: string
): Promise<TimeSlot[]> {
  // Block past dates and dates beyond 30 days
  const now = new Date()
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 30)
  if (date < new Date(now.toDateString()) || date > maxDate) return []

  // Check if day is a ClosedDay
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const closedDay = await prisma.closedDay.findFirst({
    where: { date: { gte: startOfDay, lte: endOfDay } },
  })
  if (closedDay) return []

  // Fetch service duration
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { duration: true },
  })
  if (!service) return []

  // Fetch settings for buffer minutes
  const settings = await prisma.settings.findUnique({
    where: { id: 'main' },
    select: { bufferMinutes: true, defaultSchedule: true },
  })
  const bufferMinutes = settings?.bufferMinutes ?? 10
  const defaultSchedule: WeekSchedule = settings?.defaultSchedule
    ? JSON.parse(settings.defaultSchedule as string)
    : {}

  const dayKey = getDayKey(date)

  // Fetch stylists
  const stylists = await prisma.stylist.findMany({
    where: {
      active: true,
      ...(stylistId !== 'any' ? { id: stylistId } : {}),
    },
    select: { id: true, schedule: true },
  })

  if (stylists.length === 0) return []

  // Collect slots per stylist then merge if 'any'
  const allSlots: TimeSlot[] = []

  for (const stylist of stylists) {
    const stylistSchedule: WeekSchedule = stylist.schedule
      ? JSON.parse(stylist.schedule as string)
      : {}

    // Use stylist schedule override if set, else default
    const daySchedule = stylistSchedule[dayKey] !== undefined
      ? stylistSchedule[dayKey]
      : defaultSchedule[dayKey]

    if (!daySchedule) continue // day is closed for this stylist

    const { hours: startHours, minutes: startMinutes } = parseTime(daySchedule.start)
    const { hours: endHours, minutes: endMinutes } = parseTime(daySchedule.end)

    const workStart = new Date(date)
    workStart.setHours(startHours, startMinutes, 0, 0)

    const workEnd = new Date(date)
    workEnd.setHours(endHours, endMinutes, 0, 0)

    // Fetch existing confirmed appointments for this stylist on this day
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        stylistId: stylist.id,
        status: { in: ['confirmed'] },
        date: { gte: startOfDay, lte: endOfDay },
      },
      select: { date: true, endTime: true },
      orderBy: { date: 'asc' },
    })

    // Generate slots every (serviceDuration + buffer) minutes
    const slotDuration = service.duration // in minutes
    const stepMinutes = slotDuration + bufferMinutes

    let cursor = new Date(workStart)
    // If date is today, start from now + 1 hour minimum
    if (date.toDateString() === now.toDateString()) {
      const minStart = new Date(now)
      minStart.setMinutes(minStart.getMinutes() + 60)
      if (minStart > cursor) {
        // Round up to next slot boundary
        const diff = Math.ceil(
          (minStart.getTime() - cursor.getTime()) / (stepMinutes * 60000)
        ) * stepMinutes
        cursor = new Date(cursor.getTime() + diff * 60000)
      }
    }

    while (true) {
      const slotEnd = new Date(cursor.getTime() + slotDuration * 60000)
      // Leave buffer before work end
      if (slotEnd.getTime() + bufferMinutes * 60000 > workEnd.getTime()) break

      // Check for overlap with existing appointments (including their buffer)
      const overlaps = existingAppointments.some((appt: { date: Date, endTime: Date }) => {
        const apptStart = new Date(appt.date)
        const apptEnd = new Date(appt.endTime)
        const apptEndWithBuffer = new Date(apptEnd.getTime() + bufferMinutes * 60000)
        return cursor < apptEndWithBuffer && slotEnd > apptStart
      })

      if (!overlaps) {
        allSlots.push({
          start: new Date(cursor),
          end: new Date(slotEnd),
          startStr: `${String(cursor.getHours()).padStart(2, '0')}:${String(cursor.getMinutes()).padStart(2, '0')}`,
          endStr: `${String(slotEnd.getHours()).padStart(2, '0')}:${String(slotEnd.getMinutes()).padStart(2, '0')}`,
        })
      }

      cursor = new Date(cursor.getTime() + stepMinutes * 60000)
    }
  }

  // Deduplicate by startStr when stylistId is 'any'
  if (stylistId === 'any') {
    const seen = new Set<string>()
    return allSlots.filter((s) => {
      if (seen.has(s.startStr)) return false
      seen.add(s.startStr)
      return true
    }).sort((a, b) => a.start.getTime() - b.start.getTime())
  }

  return allSlots.sort((a, b) => a.start.getTime() - b.start.getTime())
}
