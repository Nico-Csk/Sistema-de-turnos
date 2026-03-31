export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import prisma from '@/lib/db'
import { getAvailableSlots } from '@/lib/availability'
import resend from '@/lib/resend'
import BookingConfirmationEmail from '@/components/emails/BookingConfirmationEmail'
import { formatDate, formatPrice } from '@/lib/utils'
import { rateLimit } from '@/lib/rate-limit'

const appointmentSchema = z.object({
  serviceId: z.string().min(1),
  stylistId: z.string().min(1),
  date: z.string().refine((d) => !isNaN(new Date(d).getTime()), 'Fecha inválida'),
  clientName: z.string().min(2, 'El nombre es obligatorio'),
  clientPhone: z.string().min(6, 'El teléfono es obligatorio'),
  clientEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  notes: z.string().optional(),
  _honey: z.string().optional(), // honeypot field — checked before validation
})

export async function POST(request: NextRequest) {
  // Rate limiting: max 5 appointment creations per minute per IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
  const { success } = rateLimit(ip, { maxRequests: 5, interval: 60_000 })
  if (!success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Esperá un momento e intentá de nuevo.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  // Honeypot check: if the hidden field has a value, it's a bot
  if (typeof body === 'object' && body !== null && '_honey' in body && (body as any)._honey) {
    // Silently accept but don't create anything — don't reveal the trap
    return NextResponse.json({ id: 'ok' }, { status: 201 })
  }

  const parsed = appointmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { serviceId, stylistId, date, clientName, clientPhone, clientEmail, notes } =
    parsed.data

  const appointmentDate = new Date(date)

  // Business rule: no booking less than 1 hour in advance
  const oneHourFromNow = new Date()
  oneHourFromNow.setHours(oneHourFromNow.getHours() + 1)
  if (appointmentDate < oneHourFromNow) {
    return NextResponse.json(
      { error: 'El turno debe reservarse con al menos 1 hora de anticipación' },
      { status: 422 }
    )
  }

  // Business rule: no more than 30 days in advance
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 30)
  if (appointmentDate > maxDate) {
    return NextResponse.json(
      { error: 'No se puede reservar a más de 30 días en el futuro' },
      { status: 422 }
    )
  }

  // Business rule: same phone can't have more than 2 active appointments
  const activeCount = await prisma.appointment.count({
    where: {
      clientPhone,
      status: 'confirmed',
    },
  })
  if (activeCount >= 2) {
    return NextResponse.json(
      { error: 'Este número de teléfono ya tiene 2 turnos activos' },
      { status: 422 }
    )
  }

  // Fetch service to get duration
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { duration: true },
  })
  if (!service) {
    return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 })
  }

  // Resolve actual stylistId if 'any' was selected — pick first available
  let resolvedStylistId = stylistId
  if (stylistId === 'any') {
    const slots = await getAvailableSlots(appointmentDate, serviceId, 'any')
    const matchingSlot = slots.find(
      (s) => s.start.getTime() === appointmentDate.getTime()
    )
    if (!matchingSlot) {
      return NextResponse.json({ error: 'El horario ya no está disponible' }, { status: 409 })
    }
    // Get first available stylist for this slot
    const stylists = await prisma.stylist.findMany({
      where: { active: true },
      select: { id: true },
    })
    resolvedStylistId = stylists[0]?.id ?? stylistId
  }

  const endTime = new Date(appointmentDate.getTime() + service.duration * 60000)

  // Atomic transaction: verify + create
  try {
    const appointment = await prisma.$transaction(async (tx) => {
      // Re-check availability within transaction
      const settings = await tx.settings.findUnique({
        where: { id: 'main' },
        select: { bufferMinutes: true },
      })
      const buffer = (settings?.bufferMinutes ?? 10) * 60000

      const overlap = await tx.appointment.findFirst({
        where: {
          stylistId: resolvedStylistId,
          status: 'confirmed',
          AND: [
            { date: { lt: new Date(endTime.getTime() + buffer) } },
            { endTime: { gt: new Date(appointmentDate.getTime() - buffer) } },
          ],
        },
      })

      if (overlap) {
        throw new Error('El horario ya fue reservado por otro cliente')
      }

      const cancelToken = crypto.randomBytes(32).toString('hex')

      return tx.appointment.create({
        data: {
          date: appointmentDate,
          endTime,
          status: 'confirmed',
          clientName,
          clientPhone,
          clientEmail: clientEmail || null,
          notes: notes || null,
          stylistId: resolvedStylistId,
          serviceId,
          cancelToken,
        },
        include: {
          stylist: { select: { name: true } },
          service: { select: { name: true, duration: true, price: true } },
        },
      })
    })

    // Send confirmation email if email was provided and Resend is configured
    if (appointment.clientEmail && resend) {
      try {
        await resend.emails.send({
          from: 'Tu Peluquería <onboarding@resend.dev>',
          to: appointment.clientEmail,
          subject: 'Confirmación de Turno - Tu Peluquería',
          react: (
            <BookingConfirmationEmail
              clientName={appointment.clientName}
              serviceName={appointment.service.name}
              stylistName={appointment.stylist.name}
              date={formatDate(appointment.date, "EEEE d 'de' MMMM")}
              time={formatDate(appointment.date, "HH:mm")}
              price={formatPrice(appointment.service.price)}
            />
          ),
        })
      } catch (err) {
        console.error('Error sending email:', err)
        // We don't throw here, so the success response below is still sent
      }
    }

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message.includes('ya fue reservado')) {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }
    console.error('Error creating appointment:', error)
    
    return NextResponse.json(
      { error: 'Hubo un problema al confirmar el turno. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
