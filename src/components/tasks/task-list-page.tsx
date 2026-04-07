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
      ? CATEGORY_OPTIONS.find((c) => c.slug === normalizedCategory)?.name ?? null
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

  return (
    <div className="site-shell">
      <NavbarShell />
      <div className="site-page-header">
        <div className="site-page-header-inner">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                {headerEyebrow}
              </p>
              <h1 className="mt-2 font-sans text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                {headerTitle}
              </h1>
              <p className="mt-2 text-sm text-neutral-600">{headerSub}</p>
            </div>
            <form className="flex flex-wrap items-center gap-3" action={taskConfig?.route || "#"}>
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
          <section className="site-surface-card mb-12 p-6 sm:p-8">
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
