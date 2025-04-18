import { prisma } from '@/lib/prisma'
import { FilterControls } from '@/components/monuments/filter-controls'
import { MonumentTile } from '@/components/monuments/monument-tile'
import { Prisma } from "@prisma/client"

export const metadata = {
  title: 'Monuments | Indian Monuments',
  description: 'Explore India\'s magnificent monuments, their history, and plan your visit.',
}

interface SearchParams {
  page?: string
  sort?: string
  type?: string
  region?: string
  category?: string
}

type MonumentWithRelations = {
  id: string
  name: string
  slug: string
  description: string
  location: string
  city: string
  country: string
  images: { id: string; url: string; alt: string | null }[]
  categories: { id: string; name: string; slug: string }[]
  tags: { id: string; name: string; slug: string }[]
}

async function getMonuments(searchParams: SearchParams = {}) {
  const page = Number(searchParams.page) || 1
  const limit = 9
  const skip = (page - 1) * limit

  // Build filter conditions
  const where: Record<string, unknown> = {}
  
  if (searchParams.type && searchParams.type !== 'all') {
    where.type = searchParams.type
  }
  
  if (searchParams.region && searchParams.region !== 'all') {
    where.region = searchParams.region
  }
  
  if (searchParams.category && searchParams.category !== 'all') {
    where.categories = {
      some: {
        slug: searchParams.category,
      },
    }
  }

  // Build sort condition
  const orderBy: Prisma.MonumentOrderByWithRelationInput = (() => {
    const sort = searchParams.sort || 'popular-desc'
    switch (sort) {
      case 'name-asc':
        return { name: 'asc' as const }
      case 'name-desc':
        return { name: 'desc' as const }
      case 'popular-desc':
        return { popularity: 'desc' as const }
      case 'popular-asc':
        return { popularity: 'asc' as const }
      default:
        return { popularity: 'desc' as const }
    }
  })()

  const monuments = await prisma.monument.findMany({
    include: {
      images: true,
      categories: true,
      tags: true,
    },
    where: where as Prisma.MonumentWhereInput,
    orderBy,
    skip,
    take: limit,
  })
  return monuments as MonumentWithRelations[]
}

export default async function MonumentsPage({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  // Parse searchParams at the component level
  const parsedParams = {
    region: searchParams?.region || 'all',
    type: searchParams?.type || 'all',
    category: searchParams?.category || 'all',
    sort: searchParams?.sort || 'popular-desc',
    page: searchParams?.page
  }

  const monuments = await getMonuments(parsedParams)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Indian Monuments</h1>
      
      <FilterControls 
        activeRegion={parsedParams.region}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {monuments.map((monument) => (
          <MonumentTile key={monument.id} monument={monument} />
        ))}
      </div>
    </div>
  )
} 