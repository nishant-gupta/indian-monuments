import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/auth.config"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return new Response('Unauthorized', { status: 401 })
    }

    const monument = await prisma.monument.findUnique({
      where: { slug: params.slug },
    })

    if (!monument) {
      return new Response('Monument not found', { status: 404 })
    }

    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: session.user.email,
        monumentId: monument.id,
      },
    })

    return Response.json({ isFavorite: !!favorite })
  } catch (error) {
    console.error('Error checking favorite status:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const monument = await prisma.monument.findUnique({
      where: { slug: params.slug },
      select: { id: true }
    })

    if (!monument) {
      return new NextResponse('Monument not found', { status: 404 })
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        user: { email: session.user.email },
        monumentId: monument.id
      }
    })

    if (existingFavorite) {
      // Remove from favorites
      await prisma.favorite.delete({
        where: { id: existingFavorite.id }
      })
      return NextResponse.json({ isFavorite: false })
    } else {
      // Add to favorites
      await prisma.favorite.create({
        data: {
          user: { connect: { email: session.user.email } },
          monument: { connect: { id: monument.id } }
        }
      })
      return NextResponse.json({ isFavorite: true })
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 