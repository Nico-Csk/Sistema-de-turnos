import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  
  const res = await prisma.stylist.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(res)
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  
  const { name, photoUrl } = await req.json()
  
  if (!name) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
  }

  const defaultSchedule = JSON.stringify({
    mon: { start: "09:00", end: "19:00" },
    tue: { start: "09:00", end: "19:00" },
    wed: { start: "09:00", end: "19:00" },
    thu: { start: "09:00", end: "19:00" },
    fri: { start: "09:00", end: "19:00" },
    sat: { start: "10:00", end: "14:00" }
  })

  const res = await prisma.stylist.create({ 
    data: { name, photoUrl: photoUrl || null, schedule: defaultSchedule } 
  })
  return NextResponse.json(res)
}
