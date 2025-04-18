'use client'

import { useSession, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Monument {
  id: string
  name: string
  slug: string
  images: { url: string; alt: string }[]
}

export default function ProfileContent() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    },
  })

  const [favorites, setFavorites] = useState<Monument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites')
        if (!response.ok) throw new Error('Failed to fetch favorites')
        const data = await response.json()
        setFavorites(data)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className="text-muted-foreground">
              Manage your personal information and account settings.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="mt-1">{session.user?.name ?? &quot;Not provided&quot;}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="mt-1">{session.user?.email}</p>
            </div>
            {session.user?.image && (
              <div>
                <label className="text-sm font-medium">Profile Picture</label>
                <div className="mt-2">
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'Profile picture'}
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Your Favorites</h2>
            <p className="text-muted-foreground">
              Monuments you've added to your favorites list.
            </p>
          </div>
          <div className="grid gap-4">
            {favorites.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                You haven&apos;t added any monuments to your favorites yet.
              </p>
            ) : (
              favorites.map((monument) => (
                <div
                  key={monument.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  {monument.images?.[0] && (
                    <Image
                      src={monument.images[0].url}
                      alt={monument.images[0].alt}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <Link
                      href={`/monuments/${monument.slug}`