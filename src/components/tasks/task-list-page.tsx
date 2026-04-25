import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskListClient } from "@/components/tasks/task-list-client";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";

import { taskIntroCopy } from '@/config/site.content';



export async function TaskListPage({
  task,
  category,
}: {
  task: TaskKey;
  category?: string;
}) {
  const taskConfig = getTaskConfig(task);
  const posts = await fetchTaskPosts(task, 30);
  const categoryLabels = new Map(
    posts
      .map((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category.trim() : "";
        if (!value) return null;

        const normalizedValue = normalizeCategory(value);
        const matchedOption = CATEGORY_OPTIONS.find(
          (item) => item.slug === normalizedValue || item.name.toLowerCase() === value.toLowerCase()
        );

        return [normalizedValue, matchedOption?.name ?? value] as const;
      })
      .filter((item): item is readonly [string, string] => Boolean(item))
  );
  const normalizedCategory = category ? normalizeCategory(category) : "all";
  const intro = taskIntroCopy[task];
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || "/posts"}/${post.slug}`,
    name: post.title,
  }));

  const categoryLabel =
    normalizedCategory !== "all"
      ? categoryLabels.get(normalizedCategory) ??
        CATEGORY_OPTIONS.find((c) => c.slug === normalizedCategory)?.name ??
        category ??
        null
      : null;

  const headerEyebrow =
    task === "listing" && categoryLabel ? categoryLabel : taskConfig?.label || task;
  const headerTitle =
    task === "listing" && categoryLabel
      ? `${categoryLabel} business listings`
      : taskConfig?.description || "Latest posts";
  const headerSub =
    task === "listing" && categoryLabel
      ? `Businesses and services in the ${categoryLabel} category. Change the filter below to explore other industries.`
      : "Browse by category to narrow results.";
  const isListingPage = task === "listing";

  return (
    <div className={isListingPage ? "site-shell bg-[#f7f3eb]" : "site-shell"}>
      <NavbarShell />
      <div
        className={
          isListingPage
            ? "relative overflow-hidden border-b border-amber-200/70 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_34%),linear-gradient(135deg,#fffaf0_0%,#ffffff_48%,#f4efe6_100%)]"
            : "site-page-header"
        }
      >
        {isListingPage ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-90"
            aria-hidden
          />
        ) : null}
        <div className="site-page-header-inner">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p
                className={
                  isListingPage
                    ? "text-xs font-semibold uppercase tracking-[0.22em] text-amber-800"
                    : "text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500"
                }
              >
                {headerEyebrow}
              </p>
              <h1
                className={
                  isListingPage
                    ? "mt-2 font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl"
                    : "mt-2 font-sans text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl"
                }
              >
                {headerTitle}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">{headerSub}</p>
            </div>
            <form
              className={
                isListingPage
                  ? "flex flex-wrap items-center gap-3 rounded-xl border border-white/70 bg-white/80 p-3 shadow-sm backdrop-blur"
                  : "flex flex-wrap items-center gap-3"
              }
              action={taskConfig?.route || "#"}
            >
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Category
              </label>
              <select
                name="category"
                defaultValue={normalizedCategory}
                className="h-10 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 shadow-sm"
              >
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="h-10 rounded-lg bg-neutral-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      </div>

      <main className="site-container flex-1 py-10 sm:py-12">
        {task === "listing" ? (
          <SchemaJsonLd
            data={[
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                name: "Business Directory Listings",
                itemListElement: schemaItems,
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: "Worldwide",
              },
            ]}
          />
        ) : null}
        {task === "article" || task === "classified" ? (
          <SchemaJsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ""}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {intro ? (
          <section
            className={
              isListingPage
                ? "mb-12 rounded-xl border border-amber-200/60 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8"
                : "site-surface-card mb-12 p-6 sm:p-8"
            }
          >
            <h2 className="font-sans text-2xl font-bold tracking-tight text-neutral-950">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-sm leading-relaxed text-neutral-600">
                {paragraph}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-semibold text-neutral-900 underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  );
}
