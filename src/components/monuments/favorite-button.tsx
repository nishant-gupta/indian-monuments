"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  slug: string
  className?: string
  iconClassName?: string
}

export function FavoriteButton({ slug, className, iconClassName }: FavoriteButtonProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkFavoriteStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/monuments/${slug}/favorite`)
      if (response.ok) {
        const data = await response.json()
        setIsFavorited(data.isFavorite)
      }
    } catch (error) {
      console.error("Error checking favorite status:", error)
    }
  }, [slug])

  useEffect(() => {
    if (session?.user) {
      checkFavoriteStatus()
    }
  }, [session, checkFavoriteStatus])

  const toggleFavorite = async () => {
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add monuments to your favorites.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/monuments/${slug}/favorite`, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        setIsFavorited(data.isFavorite)
        toast({
          title: data.isFavorite ? "Added to favorites" : "Removed from favorites",
          description: data.isFavorite
            ? "This monument has been added to your favorites."
            : "This monument has been removed from your favorites.",
        })
      } else {
        throw new Error("Failed to toggle favorite")
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast({
        title: "Error",
        description: "Failed to update favorite status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={(e) => {
        e.preventDefault()
        toggleFavorite()
      }}
      disabled={isLoading}
      className={cn(
        "h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white",
        isFavorited ? "bg-white hover:bg-white" : "bg-white/10 hover:bg-white/20",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4",
          isFavorited ? "fill-current text-red-500" : "text-gray-600",
          iconClassName
        )}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      />
    </Button>
  )
}