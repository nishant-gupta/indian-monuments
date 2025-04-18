import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth.config'
import { prisma } from '@/lib/prisma'
import { Favorite, Image, Monument } from '@prisma/client'

type FavoriteWithMonument = Favorite & {
  monument: Monument & {
    images: Image[]
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        user: {
          email: session.user.email
        }
      },
      include: {
        monument: {
          include: {
            images: true
          }
        }
      }
    })

    // Transform the response to match the expected format
    const transformedFavorites = favorites.map((favorite: FavoriteWithMonument) => ({
      id: favorite.monument.id,
      name: favorite.monument.name,
      slug: favorite.monument.slug,
      images: favorite.monument.images.map((image: Image) => ({
        url: image.url,
        alt: image.alt
      }))
    }))

    return NextResponse.json(transformedFavorites)
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 