"use client"

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FilterTabsProps {
  activeCategory?: string | null
  categories: Array<{
    name: string
    slug: string
    count?: number
  }>
}

export function FilterTabs({ activeCategory, categories }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/monuments"
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
          !activeCategory
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted hover:bg-muted/80'
        )}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/monuments?category=${category.slug}`}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            activeCategory === category.slug
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          )}
        >
          {category.name}
          {category.count !== undefined && (
            <span className="ml-1 text-xs">({category.count})</span>
          )}
        </Link>
      ))}
    </div>
  )
} 