"use client";

import { useMemo, useState } from "react";
import type { SitePost } from "@/lib/site-connector";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { cn } from "@/lib/utils";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";

const TAB_ITEMS: Array<{ label: string; slug: string | null }> = [
  { label: "All", slug: null },
  ...CATEGORY_OPTIONS.slice(0, 6).map((c) => ({ label: c.name, slug: c.slug })),
];

function postInCategory(post: SitePost, slug: string | null) {
  if (!slug) return true;
  const content = post.content && typeof post.content === "object" ? post.content : {};
  const raw =
    typeof (content as { category?: string }).category === "string"
      ? (content as { category: string }).category
      : "";
  return normalizeCategory(raw) === slug;
}

export function DirectoriesTabs({ posts }: { posts: SitePost[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filtered = useMemo(
    () => (posts.length ? posts.filter((p) => postInCategory(p, activeSlug)) : []),
    [posts, activeSlug],
  );

  const slice =
    filtered.length >= 6
      ? filtered.slice(0, 6)
      : filtered.length
        ? (Array.from({ length: 6 }, (_, i) => filtered[i % filtered.length]) as SitePost[])
        : [];

  if (!posts.length) {
    return <p className="text-sm text-neutral-500">No listings to display in this grid yet.</p>;
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-1 border-b border-neutral-200/90 pb-4">
        {TAB_ITEMS.map((tab) => {
          const isActive = activeSlug === tab.slug;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveSlug(tab.slug)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {slice.map((post, idx) => (
          <TaskPostCard
            key={`${post.id}-${activeSlug ?? "all"}-${idx}`}
            post={post}
            href={buildPostUrl("listing", post.slug)}
            taskKey="listing"
            className="rounded-xl border border-neutral-200/90 bg-white shadow-sm hover:shadow-md"
          />
        ))}
      </div>
    </div>
  );
}
