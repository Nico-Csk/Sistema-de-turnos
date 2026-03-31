export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
  const { success } = rateLimit(ip, { maxRequests: 15, interval: 60_000 })
  if (!success) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })
  }

  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Token requerido' }, { status: 400 })
  }

  const appointment = await prisma.appointment.findUnique({
    where: { cancelToken: token },
    include: {
      stylist: { select: { name: true } },
      service: { select: { name: true, duration: true, price: true } },
    },
  })

  if (!appointment) {
    return NextResponse.json({ error: 'Turno no encontrado' }, { status: 404 })
  }

  return NextResponse.json({
    id: appointment.id,
    date: appointment.date,
    status: appointment.status,
    clientName: appointment.clientName,
    service: appointment.service,
    stylist: appointment.stylist,
  })
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
  const { success } = rateLimit(ip, { maxRequests: 5, interval: 60_000 })
  if (!success) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })
  }

  let body: { token?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  if (!body.token) {
    return NextResponse.json({ error: 'Token requerido' }, { status: 400 })
  }

  const appointment = await prisma.appointment.findUnique({
    where: { cancelToken: body.token },
  })

  if (!appointment) {
    return NextResponse.json({ error: 'Turno no encontrado' }, { status: 404 })
  }

  if (appointment.status !== 'confirmed') {
    return NextResponse.json({ error: 'Este turno ya no se puede cancelar' }, { status: 422 })
  }

  // Must cancel at least 2 hours before the appointment
  const twoHoursBefore = new Date(appointment.date.getTime() - 2 * 60 * 60 * 1000)
  if (new Date() > twoHoursBefore) {
    return NextResponse.json(
      { error: 'No se puede cancelar con menos de 2 horas de anticipación' },
      { status: 422 }
    )
  }

  await prisma.appointment.update({
    where: { id: appointment.id },
    data: { status: 'cancelled' },
  })

  return NextResponse.json({ message: 'Turno cancelado correctamente' })
}
