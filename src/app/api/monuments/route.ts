import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const monuments = await prisma.monument.findMany({
      include: {
        images: true,
        categories: true,
        tags: true,
      },
    })

    return NextResponse.json(monuments)
  } catch (error) {
    console.error('Error fetching monuments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch monuments' },
      { status: 500 }
    )
  }
} 