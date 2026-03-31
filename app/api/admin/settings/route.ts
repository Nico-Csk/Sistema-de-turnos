export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    let settings = await prisma.settings.findUnique({ where: { id: 'main' } })
    
    if (!settings) {
      // Create default settings if they don't exist
      settings = await prisma.settings.create({
        data: {
          id: 'main',
          salonName: 'Tu Peluquería',
          bufferMinutes: 10,
          defaultSchedule: {
            mon: { start: "09:00", end: "19:00" },
            tue: { start: "09:00", end: "19:00" },
            wed: { start: "09:00", end: "19:00" },
            thu: { start: "09:00", end: "19:00" },
            fri: { start: "09:00", end: "19:00" },
            sat: { start: "10:00", end: "14:00" },
            sun: null
          } as any
        }
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener configuración' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const data = await req.json()
  
  try {
    const settings = await prisma.settings.update({
      where: { id: 'main' },
      data: {
        ...(data.salonName && { salonName: data.salonName }),
        ...(data.bufferMinutes !== undefined && { bufferMinutes: Number(data.bufferMinutes) }),
        ...(data.defaultSchedule && { defaultSchedule: data.defaultSchedule })
      }
    })
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar configuración' }, { status: 500 })
  }
}
