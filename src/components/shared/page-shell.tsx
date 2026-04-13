'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { cn } from '@/lib/utils'

export type PageShellVariant = 'default' | 'brand'

export function PageShell({
  title,
  description,
  actions,
  children,
  variant = 'default',
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  variant?: PageShellVariant
}) {
  return (
    <div className="site-shell">
      <NavbarShell />
      <main className="flex flex-1 flex-col">
        <section
          className={cn(
            'site-page-header',
            variant === 'brand' &&
              'relative border-b border-amber-200/70 bg-gradient-to-br from-amber-50/80 via-white to-neutral-50',
          )}
        >
          {variant === 'brand' ? (
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-90"
              aria-hidden
            />
          ) : null}
          <div className="site-page-header-inner">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1
                  className={cn(
                    'tracking-tight text-neutral-950',
                    variant === 'brand'
                      ? 'font-[family-name:var(--font-fraunces)] text-3xl font-semibold sm:text-[2.75rem]'
                      : 'font-sans text-3xl font-bold sm:text-4xl',
                  )}
                >
                  {title}
                </h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="site-container flex-1 py-10 sm:py-12">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
