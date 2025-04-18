"use client"

import Link from 'next/link'
import Image from 'next/image'
import { FavoriteButton } from './favorite-button'

interface MonumentTileProps {
  monument: {
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
}

export function MonumentTile({ monument }: MonumentTileProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
        {monument.images.length > 0 ? (
          <>
            <Link href={`/monuments/${monument.slug}`} className="block h-full">
              <Image
                src={monument.images[0].url}
                alt={monument.images[0].alt || monument.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
            {/* Favorite Button */}
            <div className="absolute right-2 top-2 z-20">
              <FavoriteButton slug={monument.slug} />
            </div>
          </>
        ) : (
          <>
            <Link href={`/monuments/${monument.slug}`} className="block h-full">
              <div className="flex h-full items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            </Link>
            {/* Favorite Button */}
            <div className="absolute right-2 top-2 z-20">
              <FavoriteButton slug={monument.slug} />
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <Link href={`/monuments/${monument.slug}`} className="block">
        <div className="p-4">
          {/* Title */}
          <h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
            {monument.name}
          </h2>

          {/* Location */}
          <p className="mb-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg
              className="mr-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {monument.city}, {monument.country}
          </p>

          {/* Description */}
          <p className="mb-4 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
            {monument.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {monument.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
} 