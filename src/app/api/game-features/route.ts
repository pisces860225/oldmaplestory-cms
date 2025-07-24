import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const features = await prisma.gameFeature.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(features)
  } catch (error) {
    console.error('Error fetching game features:', error)
    return NextResponse.json({ error: 'Failed to fetch game features' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const feature = await prisma.gameFeature.create({
      data
    })
    return NextResponse.json(feature)
  } catch (error) {
    console.error('Error creating game feature:', error)
    return NextResponse.json({ error: 'Failed to create game feature' }, { status: 500 })
  }
}
