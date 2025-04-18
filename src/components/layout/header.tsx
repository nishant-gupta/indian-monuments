'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Building2, Heart, Search, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Monuments', href: '/monuments' },
  { name: 'Categories', href: '/categories' },
  { name: 'Map', href: '/map' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/auth/signin')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Building2 className="h-6 w-6" />
          <span className="hidden sm:inline">MonumentHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Right side buttons & Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Heart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Image
                    src={session.user.image || '/placeholder-user.png'}
                    alt={session.user.name || 'User avatar'}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-950 border-t z-40">
          <nav className="flex flex-col space-y-1 px-4 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={toggleMobileMenu} // Close menu on click
                >
                  {item.name}
                </Link>
              )
            })}
            {!session && (
              <Link
                href="/auth/signin"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={toggleMobileMenu}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
} 