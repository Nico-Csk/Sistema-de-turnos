export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  const stylists = await prisma.stylist.findMany({
    where: { active: true },
    select: { id: true, name: true, photoUrl: true, schedule: true },
    orderBy: { name: 'asc' },
  })
  return NextResponse.json(stylists)
}
