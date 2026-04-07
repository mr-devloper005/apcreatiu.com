import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { ContentImage } from "@/components/shared/content-image";
import { buildPostUrl, getPostImages } from "@/lib/task-data";
import { siteContent } from "@/config/site.content";
import { DirectoriesTabs } from "@/components/home/directories-tabs";
import { Button } from "@/components/ui/button";
import { ListingBookmarkButton, ListingHeartButton } from "@/components/home/home-feed-save-buttons";

function ratingFromSlug(slug: string) {
  const n = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return (4.4 + (n % 7) / 10).toFixed(1);
}

function PromoCard({
  title,
  bullets,
  ctaLabel,
  href,
}: {
  title: string;
  bullets: readonly string[];
  ctaLabel: string;
  href: string;
}) {
  return (
    <aside className="flex h-full flex-col rounded-xl border border-neutral-200/90 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold tracking-tight text-neutral-900">{title}</h3>
      <ul className="mt-4 flex-1 space-y-3 text-sm leading-relaxed text-neutral-600">
        {bullets.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-950" />
            {line}
          </li>
        ))}
      </ul>
      <Button
        asChild
        className="mt-6 w-full rounded-lg bg-neutral-950 font-semibold text-white hover:bg-neutral-800"
      >
        <Link href={href}>{ctaLabel}</Link>
      </Button>
    </aside>
  );
}

export function HomeListifySections({ posts }: { posts: SitePost[] }) {
  if (!posts.length) {
    return (
      <section className="border-b border-neutral-200 bg-white py-16 text-center">
        <p className="text-neutral-600">Listings will appear here when they are available.</p>
        <Link
          href="/listings"
          className="mt-4 inline-block text-sm font-semibold text-neutral-900 underline underline-offset-4"
        >
          Open the directory
        </Link>
      </section>
    );
  }

  const list = posts;
  const pick = (i: number) => list[i % list.length];
  const trending = Array.from({ length: 4 }, (_, i) => pick(i));
  const destinations = [pick(0), pick(1), pick(2)];
  const smallGrid = Array.from({ length: 6 }, (_, i) => pick(i + 3));
  const dirPosts = list.length >= 6 ? list.slice(0, 12) : list;

  const copy = siteContent.home.listify;

  return (
    <>
      {/* Trending */}
      <section className="border-b border-neutral-200/80 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                {copy.trendingTitle}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-neutral-600">
                Popular listings visitors are saving and opening right now.
              </p>
            </div>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {trending.map((post) => (
                <div key={post.id} className="relative">
                  <ListingBookmarkButton postId={post.id} />
                  <TaskPostCard
                    post={post}
                    href={buildPostUrl("listing", post.slug)}
                    taskKey="listing"
                    className="rounded-xl border border-neutral-200/90 bg-white shadow-sm"
                  />
                  <div className="mt-3 flex items-center justify-between px-0.5">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold text-neutral-900">
                        {ratingFromSlug(post.slug)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <PromoCard
              title={copy.promoUnlockTitle}
              bullets={copy.promoUnlockBullets}
              ctaLabel={copy.promoUnlockCta}
              href="/register"
            />
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="border-b border-neutral-200/80 bg-neutral-50/80 py-14 sm:py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <h2 className="font-sans text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            {copy.recommendedTitle}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] xl:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {copy.popularDestinations}
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {destinations.map((post, idx) => {
                  const img = getPostImages(post)[0] || "/placeholder.svg?height=640&width=960";
                  const labels = ["Featured area", "Editor pick", "Trending spot"];
                  return (
                    <Link
                      key={`${post.id}-dest-${idx}`}
                      href={buildPostUrl("listing", post.slug)}
                      className="group relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-neutral-200/90 bg-neutral-200 shadow-sm"
                    >
                      <ContentImage
                        src={img}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="380px"
                        intrinsicWidth={800}
                        intrinsicHeight={550}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                          {labels[idx % labels.length]}
                        </p>
                        <p className="mt-1 line-clamp-2 font-sans text-xl font-bold text-white">
                          {post.title}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {smallGrid.map((post, idx) => {
                  const img = getPostImages(post)[0] || "/placeholder.svg?height=400&width=400";
                  const href = buildPostUrl("listing", post.slug);
                  return (
                    <div
                      key={`${post.id}-sm-${idx}`}
                      className="flex flex-col overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-sm"
                    >
                      <div className="relative aspect-square overflow-hidden bg-neutral-100">
                        <Link
                          href={href}
                          className="group/link absolute inset-0 z-0 block"
                          aria-label={post.title}
                        >
                          <ContentImage
                            src={img}
                            alt=""
                            fill
                            className="object-cover transition duration-500 group-hover/link:scale-105"
                            sizes="(max-width:768px) 45vw, 200px"
                            intrinsicWidth={400}
                            intrinsicHeight={400}
                          />
                        </Link>
                        <span className="pointer-events-none absolute bottom-2 left-2 z-[1] rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-bold text-neutral-900 shadow">
                          From ${(idx + 3) * 29}
                        </span>
                        <div className="absolute bottom-2 right-2 z-10">
                          <ListingHeartButton postId={post.id} />
                        </div>
                      </div>
                      <Link href={href} className="p-3">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900">
                          {post.title}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-neutral-500">
                          <MapPin className="h-3 w-3" />
                          {idx + 120} views
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directories */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              {copy.directoriesTitle}
            </h2>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:underline"
            >
              See all directories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="min-w-0">
              {dirPosts.length ? (
                <DirectoriesTabs posts={dirPosts} />
              ) : (
                <p className="text-sm text-neutral-500">No listings to show yet.</p>
              )}
            </div>
            <PromoCard
              title={copy.promoDirectoriesTitle}
              bullets={[
                "Reach visitors actively searching",
                "Structured pages that convert",
                "Tools to manage inquiries in one place",
              ]}
              ctaLabel={copy.promoDirectoriesCta}
              href="/create/listing"
            />
          </div>
        </div>
      </section>
    </>
  );
}
