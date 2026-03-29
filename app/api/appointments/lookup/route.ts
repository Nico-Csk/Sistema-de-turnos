import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
  const { success } = rateLimit(ip, { maxRequests: 10, interval: 60_000 })
  if (!success) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })
  }

  const phone = request.nextUrl.searchParams.get('phone')
  if (!phone || phone.replace(/\D/g, '').length < 6) {
    return NextResponse.json({ error: 'Teléfono inválido' }, { status: 400 })
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      clientPhone: { contains: phone.replace(/\D/g, '') },
      status: 'confirmed',
      date: { gte: new Date() },
    },
    include: {
      stylist: { select: { name: true } },
      service: { select: { name: true, duration: true, price: true } },
    },
    orderBy: { date: 'asc' },
    take: 5,
  })

  // Return appointments without sensitive data
  return NextResponse.json(
    appointments.map((a) => ({
      id: a.id,
      date: a.date,
      status: a.status,
      clientName: a.clientName,
      service: a.service,
      stylist: a.stylist,
      cancelToken: a.cancelToken,
    }))
  )
}
