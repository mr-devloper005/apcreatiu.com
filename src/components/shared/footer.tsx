import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

const footerCats = CATEGORY_OPTIONS.slice(0, 10)

export function Footer() {
  const copy = siteContent.home.listify

  return (
    <footer className="border-t border-neutral-200/90 bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1fr_1fr_minmax(0,280px)]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
                <img
                  src="/favicon.png?v=20260413"
                  alt={`${SITE_CONFIG.name} logo`}
                  width="44"
                  height="44"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="font-sans text-lg font-bold tracking-tight text-neutral-950">{SITE_CONFIG.name}</span>
                <span className="mt-0.5 block text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                  {siteContent.footer.tagline}
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-600">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-600 transition hover:border-neutral-300 hover:bg-white hover:text-neutral-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-950">{copy.footerCategoriesHeading}</h3>
            <ul className="mt-5 space-y-2.5">
              {footerCats.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/listings?category=${encodeURIComponent(cat.slug)}`}
                    className="text-sm text-neutral-600 transition hover:text-neutral-950"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-950">{copy.footerAboutHeading}</h3>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-neutral-600 hover:text-neutral-950">
                  About
                </Link>
              </li>
              <li>
                <Link href="/create/listing" className="text-sm text-neutral-600 hover:text-neutral-950">
                  List your business
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-neutral-600 hover:text-neutral-950">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-neutral-600 hover:text-neutral-950">
                  Help &amp; support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-600 hover:text-neutral-950">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-950">{copy.footerLegalHeading}</h3>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-neutral-600 hover:text-neutral-950">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-neutral-600 hover:text-neutral-950">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-neutral-600 hover:text-neutral-950">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/licenses" className="text-sm text-neutral-600 hover:text-neutral-950">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-neutral-200/90 bg-neutral-50/80 p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-950">{copy.subscribeHeading}</h3>
            <p className="mt-2 text-sm text-neutral-600">Get updates on new listings and platform news.</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder={copy.subscribePlaceholder}
                className="h-11 rounded-lg border-neutral-200 bg-white"
                autoComplete="email"
              />
              <Button
                asChild
                className="h-11 shrink-0 rounded-lg bg-neutral-950 px-5 font-semibold text-white hover:bg-neutral-800"
              >
                <Link href="/register">{copy.subscribeCta}</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-200/90 pt-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/terms" className="hover:text-neutral-800">
              Terms &amp; conditions
            </Link>
            <Link href="/privacy" className="hover:text-neutral-800">
              Privacy policy
            </Link>
            <Link href="/help" className="hover:text-neutral-800">
              Help &amp; support
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
