"use client"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Grid2X2, List } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "popular-desc", label: "Most Popular" },
  { value: "popular-asc", label: "Least Popular" },
]

const regionOptions = [
  { value: "all", label: "All Regions" },
  { value: "ASIA", label: "Asia" },
  { value: "EUROPE", label: "Europe" },
  { value: "AMERICAS", label: "Americas" },
  { value: "AFRICA", label: "Africa" },
  { value: "OCEANIA", label: "Oceania" },
]

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "HISTORICAL", label: "Historical" },
  { value: "UNESCO", label: "UNESCO" },
  { value: "ANCIENT", label: "Ancient" },
  { value: "MEDIEVAL", label: "Medieval" },
  { value: "MODERN", label: "Modern" },
]

interface FilterControlsProps {
  activeRegion?: string
}

export function FilterControls({
  activeRegion = 'all',
}: FilterControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const currentSort = searchParams.get("sort") || "name-asc"

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    params.delete('page') // Reset to first page when changing filters
    router.push(`/monuments?${params.toString()}`)
  }

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    params.delete("page") // Reset pagination when sorting changes
    router.push(`/monuments?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="region" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by:
          </label>
          <Select value={activeRegion} onValueChange={(value) => handleFilterChange('region', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <Select value={searchParams.get('type') || 'all'} onValueChange={(value) => handleFilterChange('type', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 first:rounded-l-md last:rounded-r-md",
              viewMode === 'grid'
                ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <Grid2X2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 first:rounded-l-md last:rounded-r-md",
              viewMode === 'list'
                ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 