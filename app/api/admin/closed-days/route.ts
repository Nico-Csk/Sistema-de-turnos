import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const res = await prisma.closedDay.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' }
    })
    return NextResponse.json(res)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener días cerrados' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { date, reason } = await req.json()
  
  if (!date) return NextResponse.json({ error: 'Fecha requerida' }, { status: 400 })

  try {
    const [year, month, day] = date.split('-').map(Number)
    const localDate = new Date(year, month - 1, day, 12, 0, 0) // Midday to be safe
    
    const closedDay = await prisma.closedDay.create({
      data: {
        date: localDate,
        reason: reason || null
      }
    })
    return NextResponse.json(closedDay)
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear día cerrado' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  try {
    await prisma.closedDay.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
