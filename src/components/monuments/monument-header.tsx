"use client"

import { FavoriteButton } from './favorite-button'

interface MonumentHeaderProps {
  name: string
  location: string
  slug: string
}

export function MonumentHeader({ name, location, slug }: MonumentHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <FavoriteButton slug={slug} />
      </div>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{location}</p>
    </>
  )
} 