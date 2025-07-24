import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst({
      where: { id: 'default' }
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: data,
      create: { id: 'default', ...data }
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 })
  }
}
