export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'apcreatiu',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Apcreatiu',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Business listings & discovery',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A listing-first business discovery platform for browsing services, businesses, spaces, and location-based opportunities through a cleaner browsing experience.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'apcreatiu.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://apcreatiu.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

