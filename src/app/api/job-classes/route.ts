import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const jobClasses = await prisma.jobClass.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(jobClasses)
  } catch (error) {
    console.error('Error fetching job classes:', error)
    return NextResponse.json({ error: 'Failed to fetch job classes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const jobClass = await prisma.jobClass.create({
      data
    })
    return NextResponse.json(jobClass)
  } catch (error) {
    console.error('Error creating job class:', error)
    return NextResponse.json({ error: 'Failed to create job class' }, { status: 500 })
  }
}
