import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Business listings directory',
    homeNav: 'Home',
    submitListings: 'Submit listing',
    categoriesNav: 'All listings',
  },
  footer: {
    tagline: 'Find and list businesses in one place',
  },
  hero: {
    badge: 'Curated listings & services',
    title: ['Discover businesses,', 'services, and places worth knowing.'],
    description:
      'Browse organized listings with categories, locations, and clear details—built for faster comparison and confident exploration.',
    primaryCta: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'How it works',
      href: '/about',
    },
    searchPlaceholder: 'Search listings by name, category, or location',
    focusLabel: 'Explore',
    featureCardBadge: 'featured rotation',
    featureCardTitle: 'Fresh listings shape the look of the homepage.',
    featureCardDescription:
      'Recent business and service posts stay at the center of the experience while the rest of the platform remains connected behind the scenes.',
  },
  home: {
    metadata: {
      title: 'Business listings and discoverable services',
      description:
        'Explore verified listings, services, and structured pages through a browsing experience built for discovery and comparison.',
      openGraphTitle: 'Business listings and discoverable services',
      openGraphDescription:
        'Find businesses, brands, and services in one place—with categories, locations, and details that make scanning and comparison easier.',
      keywords: [
        'business listings',
        'service directory',
        'local discovery',
        'brand pages',
        'structured listings',
      ],
    },
    introBadge: 'Listing-first platform',
    introTitle: 'Built for browsing businesses, services, and structured discovery.',
    introParagraphs: [
      'This site is built around business listings: organized entries with categories, locations, and clear details so visitors can compare services and reach out with confidence.',
      'Browse by industry, search by name or place, or start from featured picks on the homepage—every path stays focused on real businesses and services.',
      'Business owners can add or update a listing so customers always see accurate hours, contact options, and what you offer.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Homepage built around fresh and trending business listings.',
      'Category navigation matches how people search for services and suppliers.',
      'Listing cards emphasize location, category, and quick actions.',
      'Fast, readable layout on phones and desktops.',
    ],
    primaryLink: {
      label: 'Open listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'About the platform',
      href: '/about',
    },
    listify: {
      trendingTitle: 'Trending now',
      recommendedTitle: 'Recommended for you',
      popularDestinations: 'Popular destinations',
      directoriesTitle: 'Our directories',
      heroSubline: 'Curated directory · fresh listings daily',
      promoUnlockTitle: 'Unlock master plan & get:',
      promoUnlockBullets: [
        'Featured placement in category results',
        'Listing analytics and visitor insights',
        'Lead alerts and inquiry routing',
      ],
      promoUnlockCta: 'Continue',
      promoDirectoriesTitle: 'Post listings & enjoy',
      promoDirectoriesCta: 'Get started',
      ctaBannerTitle: 'Get a steady flow of leads by listing with us!',
      ctaBannerButton: 'Sign up today',
      subscribeHeading: 'Subscribe now',
      subscribePlaceholder: 'Email address',
      subscribeCta: 'Join',
      footerCategoriesHeading: 'Categories',
      footerAboutHeading: 'About',
      footerLegalHeading: 'Legal',
    },
  },
  cta: {
    badge: 'Grow your presence',
    title: 'List your business and reach people who are already browsing.',
    description:
      'Create a structured listing, keep details up to date, and connect with visitors through one clearer, listing-first experience.',
    primaryCta: {
      label: 'Get Started Free',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact Sales',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Business listings directory',
    description:
      'Browse verified listings, services, brands, and structured pages organized by category for easier discovery and comparison.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Image sharing and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Business listings directory',
    paragraphs: [
      'Every entry here is a business or service profile: category, location, contact options, and a clear description so you can compare and shortlist quickly.',
      'Use the category filter to narrow the directory, or open a listing for full details. Owners can submit updates so information stays current.',
      'If you represent a business, add a listing to appear alongside others in your industry and region.',
    ],
    links: [
      { label: 'Browse all listings', href: '/listings' },
      { label: 'Search listings', href: '/search' },
      { label: 'Add your listing', href: '/create/listing' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section hosts stories, explainers, guides, and long-form reading across topics and interests—alongside the listing-first experience elsewhere on the site.',
      'Articles connect naturally with listings, images, and resources so deeper reading can lead into related discovery when readers want more than a directory entry.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open image sharing', href: '/image-sharing' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They complement structured business listings and profiles—useful when you need a quick post rather than a full directory entry.',
      'Browse by category to find announcements quickly, then continue into listings or related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Image sharing highlights visual posts, galleries, and story-led content where imagery plays the lead role.',
      'These posts connect with listings and other sections so visuals can act as entry points into businesses, services, or deeper content.',
      'Browse the latest visual updates, then continue into related listings or supporting pages for more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the listings and content they explore.',
      'These pages work as trust anchors across the site and connect naturally with listings, stories, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related listings or content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse image sharing', href: '/image-sharing' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related listings, stories, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Browse articles', href: '/articles' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside listings, stories, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related listings or sections when you want more context.',
    ],
    links: [
      { label: 'See listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with listings and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into listings and the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected to posts and help keep discussion close to the content it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context, then continue exploring related listings or content from the same topic area.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Explore articles', href: '/articles' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, profiles, stories, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related listings and content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
