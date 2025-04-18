import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const monument = await prisma.monument.findUnique({
      where: { slug },
      include: {
        images: true,
        categories: true,
        tags: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    if (!monument) {
      return NextResponse.json(
        { error: 'Monument not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(monument)
  } catch (error) {
    console.error('Error fetching monument:', error)
    return NextResponse.json(
      { error: 'Failed to fetch monument' },
      { status: 500 }
    )
  }
} 