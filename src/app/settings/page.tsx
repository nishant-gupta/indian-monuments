import { Metadata } from "next"
import SettingsContent from "@/components/settings/settings-content"

export const metadata: Metadata = {
  title: "Settings - MonumentHub",
  description: "Manage your MonumentHub account settings",
}

export default function SettingsPage() {
  return <SettingsContent />
} 