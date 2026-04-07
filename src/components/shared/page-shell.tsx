'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="site-shell">
      <NavbarShell />
      <main className="flex flex-1 flex-col">
        <section className="site-page-header">
          <div className="site-page-header-inner">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-sans text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">{title}</h1>
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
