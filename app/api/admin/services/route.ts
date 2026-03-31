export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  
  const res = await prisma.service.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(res)
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  
  const { name, duration, price } = await req.json()
  
  if (!name || !duration || !price) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  const res = await prisma.service.create({ 
    data: { name, duration: Number(duration), price: Number(price) } 
  })
  return NextResponse.json(res)
}
