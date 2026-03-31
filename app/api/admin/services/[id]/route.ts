export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  
  const { name, duration, price, active } = await req.json()

  try {
    const res = await prisma.service.update({ 
      where: { id: params.id }, 
      data: { 
        ...(name !== undefined && { name }),
        ...(duration !== undefined && { duration: Number(duration) }),
        ...(price !== undefined && { price: Number(price) }),
        ...(active !== undefined && { active })
      } 
    })
    return NextResponse.json(res)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  
  try {
    const res = await prisma.service.update({ 
      where: { id: params.id }, 
      data: { active: false } 
    })
    return NextResponse.json(res)
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
