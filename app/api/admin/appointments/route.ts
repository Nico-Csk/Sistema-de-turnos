import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { startOfDay, endOfDay } from 'date-fns'

export async function GET(request: NextRequest) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const dateStr = searchParams.get('date')
  const stylistId = searchParams.get('stylistId')

  if (!dateStr) return NextResponse.json({ error: 'Falta la fecha' }, { status: 400 })

  // Need to parse avoiding timezone shifts. The dateStr is "YYYY-MM-DD".
  // Using new Date() directly parses "YYYY-MM-DD" as UTC midnight, which translates exactly
  // back to "YYYY-MM-DD" in local time if we use startOfDay/endOfDay. Wait, not always.
  // We'll parse the date by splitting and treating as local.
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  
  if (isNaN(date.getTime())) return NextResponse.json({ error: 'Fecha inválida' }, { status: 400 })

  const start = startOfDay(date)
  const end = endOfDay(date)

  const appointments = await prisma.appointment.findMany({
    where: {
      date: { gte: start, lte: end },
      ...(stylistId && stylistId !== 'all' ? { stylistId } : {})
    },
    include: {
      service: true,
      stylist: true
    },
    orderBy: { date: 'asc' }
  })

  return NextResponse.json(appointments)
}
