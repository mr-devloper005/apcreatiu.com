'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, Building2, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: Building2,
  listing: Building2,
  sbm: LayoutGrid,
  classified: LayoutGrid,
  image: LayoutGrid,
  profile: LayoutGrid,
  social: LayoutGrid,
  pdf: LayoutGrid,
  org: Building2,
  comment: Building2,
}

const navLinkBase =
  'shrink-0 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const isHomeActive = pathname === '/'
  const isSearchActive = pathname === '/search'
  const isAllListingsActive = pathname.startsWith('/listings')

  const navigation = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key === 'listing'),
    [],
  )

  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))

  const activeNavClass = 'bg-neutral-950 text-white shadow-sm'
  const inactiveNavClass = 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/90 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="relative mx-auto grid h-[4.25rem] max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white shadow-sm">
            <img
              src="/favicon.png?v=20260401"
              alt={`${SITE_CONFIG.name} logo`}
              width="40"
              height="40"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-sans text-lg font-bold tracking-tight text-neutral-950">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <div className="hidden min-w-0 items-center justify-center gap-1 overflow-x-auto lg:flex">
          <Link
            href="/"
            className={cn(navLinkBase, isHomeActive ? activeNavClass : inactiveNavClass)}
          >
            {siteContent.navbar.homeNav}
          </Link>
          <Link
            href="/listings"
            className={cn(navLinkBase, isAllListingsActive ? activeNavClass : inactiveNavClass)}
          >
            {siteContent.navbar.categoriesNav}
          </Link>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className={cn(
              'hidden rounded-lg text-neutral-600 hover:bg-neutral-100 md:flex',
              isSearchActive && 'bg-neutral-950 text-white hover:bg-neutral-800 hover:text-white',
            )}
          >
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-lg text-neutral-600 hover:bg-neutral-100">
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="h-10 rounded-lg bg-neutral-950 px-4 text-xs font-semibold uppercase tracking-wide text-white hover:bg-neutral-800"
              >
                <Link href="/create/listing">{siteContent.navbar.submitListings}</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg text-neutral-600 hover:bg-neutral-100 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <div className="max-h-[min(70vh,520px)] space-y-1 overflow-y-auto px-4 py-4">
            <Link
              href="/search"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mb-2 flex items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium',
                isHomeActive ? 'bg-neutral-950 text-white' : 'text-neutral-800',
              )}
            >
              {siteContent.navbar.homeNav}
            </Link>
            <Link
              href="/listings"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium',
                isAllListingsActive ? 'bg-neutral-950 text-white' : 'text-neutral-800',
              )}
            >
              {siteContent.navbar.categoriesNav}
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium',
                    isActive ? 'bg-neutral-100 text-neutral-950' : 'text-neutral-700',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
            {!isAuthenticated ? (
              <div className="grid gap-2 pt-3 sm:grid-cols-2">
                <Button variant="outline" asChild className="rounded-lg border-neutral-200">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="rounded-lg bg-neutral-950 text-white hover:bg-neutral-800">
                  <Link href="/create/listing">{siteContent.navbar.submitListings}</Link>
                </Button>
              </div>
            ) : (
              <Button asChild className="mt-2 w-full rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 lg:hidden">
                <Link href="/create/listing" onClick={() => setIsMobileMenuOpen(false)}>
                  {siteContent.navbar.submitListings}
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
