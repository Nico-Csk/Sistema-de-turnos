import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/availability'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const stylistId = searchParams.get('stylistId') || 'any'
  const serviceId = searchParams.get('serviceId')
  const dateStr = searchParams.get('date')

  if (!serviceId || !dateStr) {
    return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 })
  }

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: 'Fecha inválida' }, { status: 400 })
  }

  const slots = await getAvailableSlots(date, serviceId, stylistId)
  return NextResponse.json(slots)
}
