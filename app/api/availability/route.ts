import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/availability'
import { rateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
  const { success } = rateLimit(ip, { maxRequests: 30, interval: 60_000 })
  if (!success) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })
  }

  const { searchParams } = new URL(request.url)
  const stylistId = searchParams.get('stylistId') || 'any'
  const serviceId = searchParams.get('serviceId')
  const dateStr = searchParams.get('date')

  if (!serviceId || !dateStr) {
    return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 })
  }

  // Parse as local date (not UTC) to avoid timezone day-shift
  const [y, m, d] = dateStr.split('-').map(Number)
  if (!y || !m || !d) {
    return NextResponse.json({ error: 'Fecha inválida' }, { status: 400 })
  }
  const date = new Date(y, m - 1, d)
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: 'Fecha inválida' }, { status: 400 })
  }

  const slots = await getAvailableSlots(date, serviceId, stylistId)
  return NextResponse.json(slots)
}
