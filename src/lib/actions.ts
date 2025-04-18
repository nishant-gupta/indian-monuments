import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function toggleFavorite(monumentId: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error("You must be logged in to favorite monuments")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ monumentId }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || 
        `Failed to toggle favorite: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    revalidatePath("/monuments")
    revalidatePath(`/monuments/${monumentId}`)
    return data
  } catch (error) {
    console.error("Error toggling favorite:", error)
    throw error instanceof Error 
      ? error 
      : new Error("An unexpected error occurred while toggling favorite")
  }
} 