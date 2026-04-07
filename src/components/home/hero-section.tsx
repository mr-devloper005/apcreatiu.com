"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { SITE_CONFIG } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";
import { CATEGORY_OPTIONS } from "@/lib/categories";

const CATEGORY_TINTS = [
  "bg-violet-600",
  "bg-teal-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-400",
  "bg-orange-500",
  "bg-indigo-600",
];

const FALLBACK_IMAGE = "/placeholder.svg?height=1400&width=2400";

export function HeroSection({ images }: { images: string[] }) {
  const slides = useMemo(() => {
    const valid = images.filter(Boolean);
    return valid.length ? valid.slice(0, 3) : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slides]);

  const hero = siteContent.hero;

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        <ContentImage
          key={slides[activeIndex]}
          src={slides[activeIndex]}
          alt={`Featured backdrop ${activeIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          intrinsicWidth={1600}
          intrinsicHeight={900}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <div className="relative mx-auto max-w-[1600px] px-4 pb-8 pt-16 sm:px-6 sm:pb-10 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            {siteContent.home.listify.heroSubline}
          </p>
          <h1 className="mt-4 font-sans text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {hero.title[0]}{" "}
            <span className="text-white">{hero.title[1]}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {CATEGORY_OPTIONS.slice(0, 7).map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/listings?category=${encodeURIComponent(cat.slug)}`}
                className={`flex h-14 w-14 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition hover:scale-105 hover:opacity-95 ${CATEGORY_TINTS[i % CATEGORY_TINTS.length]}`}
                title={cat.name}
              >
                {cat.name.slice(0, 2)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating search */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-6">
          <form action="/search" method="get" className="space-y-4">
            <input type="hidden" name="master" value="1" />
            <div className="grid gap-4 md:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Location
                </span>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    name="q"
                    placeholder="City, region, or keyword"
                    className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-10 pr-3 text-sm text-neutral-900 outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-400"
                    autoComplete="off"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Activity
                </span>
                <select
                  name="category"
                  className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-900 outline-none focus:border-neutral-400"
                  defaultValue=""
                >
                  <option value="">All categories</option>
                  {CATEGORY_OPTIONS.slice(0, 24).map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Date
                </span>
                <input
                  type="date"
                  name="date"
                  className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-900 outline-none focus:border-neutral-400"
                />
              </label>
            </div>
            <div className="flex justify-center pt-1">
              <Button
                type="submit"
                className="h-12 min-w-[200px] rounded-lg bg-neutral-950 px-10 text-sm font-semibold tracking-wide text-white shadow-lg hover:bg-neutral-800"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="relative z-10 flex justify-center gap-1.5 pb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 border-t border-white/10 bg-white py-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
        <span className="text-neutral-400">{hero.focusLabel}</span>{" "}
        <Link href="/listings" className="text-neutral-900 hover:underline">
          {SITE_CONFIG.tasks.find((t) => t.key === "listing")?.label ?? "Listings"}
        </Link>
      </div>
    </section>
  );
}
