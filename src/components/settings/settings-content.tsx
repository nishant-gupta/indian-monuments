'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function SettingsContent() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    },
  })

  if (status === 'loading') {
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

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Account Settings</h2>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive email notifications about your favorite monuments and updates.
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm">
                    Configure Notifications
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Privacy</h2>
              <p className="text-muted-foreground">
                Manage your privacy settings and data.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Profile Visibility</label>
                <p className="text-sm text-muted-foreground mt-1">
                  Control who can see your profile and activities.
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm">
                    Manage Privacy
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
              <p className="text-muted-foreground">
                Irreversible and destructive actions.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 