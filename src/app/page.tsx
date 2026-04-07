import type { Metadata } from "next";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CTASection } from "@/components/home/cta-section";
import { HomeListifySections } from "@/components/home/home-listify-sections";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { fetchTaskPosts, getPostImages } from "@/lib/task-data";
import { siteContent } from "@/config/site.content";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/",
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  });
}

export default async function HomePage() {
  const listingPosts = await fetchTaskPosts("listing", 24, {
    allowMockFallback: false,
    fresh: true,
  });

  const heroImages = listingPosts
    .flatMap((post) => getPostImages(post))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="site-shell">
      <NavbarShell />
      <main className="flex flex-1 flex-col">
        <HeroSection images={heroImages} />
        <SchemaJsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${SITE_CONFIG.defaultOgImage}`,
              sameAs: [],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ]}
        />

        <HomeListifySections posts={listingPosts} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
