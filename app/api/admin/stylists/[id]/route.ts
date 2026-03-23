import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  
  const { name, photoUrl, active } = await req.json()

  try {
    const res = await prisma.stylist.update({ 
      where: { id: params.id }, 
      data: { 
        ...(name !== undefined && { name }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(active !== undefined && { active })
      } 
    })
    return NextResponse.json(res)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
