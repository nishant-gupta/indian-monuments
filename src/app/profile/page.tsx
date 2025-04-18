import { Metadata } from "next"
import ProfileContent from "@/components/profile/profile-content"

export const metadata: Metadata = {
  title: "Profile - MonumentHub",
  description: "Your MonumentHub profile",
}

export default function ProfilePage() {
  return <ProfileContent />
} 