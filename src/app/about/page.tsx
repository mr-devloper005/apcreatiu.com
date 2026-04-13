import Link from "next/link";
import { Building2, Compass, ShieldCheck, Sparkles, Target } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

const stats = [
  { label: "Categories", value: "35+", detail: "From retail to professional services" },
  { label: "Live listings", value: "8.6k+", detail: "Profiles visitors can compare side by side" },
  { label: "Monthly reach", value: "120k+", detail: "Sessions focused on discovery, not noise" },
];

const pillars = [
  {
    icon: Compass,
    title: "Built for discovery",
    body: "Structured categories, locations, and filters keep browsing focused so people find relevant businesses faster—without endless scrolling through unrelated posts.",
  },
  {
    icon: Building2,
    title: "Fair presentation",
    body: "Every listing is laid out the same way: what you offer, where you are, and how to reach you. That parity helps small teams stand on clarity, not ad spend.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by design",
    body: "We emphasize accurate hours, contact paths, and honest descriptions. The goal is a directory people return to because it feels dependable.",
  },
];

const milestones = [
  { year: "2023", text: "Launched a listings-first experience after seeing how mixed feeds buried local businesses." },
  { year: "2024", text: "Expanded categories and search so multi-location brands and solo operators could coexist cleanly." },
  { year: "2025–26", text: "Doubled down on performance, accessibility, and owner tools that make updates quick." },
];

export default function AboutPage() {
  return (
    <PageShell
      variant="brand"
      title={`About ${SITE_CONFIG.name}`}
      description={`We connect people who are ready to hire or visit with businesses that are ready to be found—through a calm, premium directory experience.`}
      actions={
        <>
          <Button variant="outline" asChild className="border-neutral-300 bg-white/80 hover:bg-white">
            <Link href="/listings">Browse listings</Link>
          </Button>
          <Button
            asChild
            className="bg-neutral-950 text-white shadow-sm hover:bg-neutral-800"
          >
            <Link href="/create/listing">List your business</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-12 lg:space-y-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900/90">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Our story
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-700">
              {SITE_CONFIG.name} began as a reaction to cluttered marketplaces and social feeds that were never meant for
              structured business discovery. We wanted a single place where owners could present their work with dignity
              and where customers could compare options without distraction.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-700">
              Today we stay disciplined: listings, clarity, and speed. No competing content types fighting for attention—
              just profiles that answer the questions people already have before they reach out.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="outline" asChild className="border-amber-300/80 text-amber-950 hover:bg-amber-50">
                <Link href="/help">How the platform works</Link>
              </Button>
              <Button variant="ghost" asChild className="text-neutral-700 hover:text-neutral-950">
                <Link href="/contact">Talk to our team</Link>
              </Button>
            </div>
          </div>
          <Card className="border-amber-200/60 bg-white/90 shadow-sm backdrop-blur-sm">
            <CardContent className="space-y-6 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                <Target className="h-4 w-4 text-amber-700" aria-hidden />
                Snapshot
              </div>
              <ul className="space-y-5">
                {milestones.map((m) => (
                  <li key={m.year} className="border-l-2 border-amber-400/80 pl-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-800/90">{m.year}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{m.text}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <Card
              key={s.label}
              className="border-neutral-200/90 bg-gradient-to-b from-white to-neutral-50/80 shadow-sm"
            >
              <CardContent className="p-6">
                <p className="font-[family-name:var(--font-fraunces)] text-3xl font-semibold text-neutral-950">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-neutral-900">{s.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">{s.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-neutral-950 sm:text-3xl">
            What guides us
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Three principles keep product and editorial decisions aligned as we grow.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="border-neutral-200/90 bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100/80 text-amber-900">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-950">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden border-amber-200/70 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-lg">
          <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div className="max-w-xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300/90">Partners & press</p>
              <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold sm:text-3xl">
                Let&apos;s build the next chapter together
              </h3>
              <p className="text-sm leading-relaxed text-neutral-300">
                Media kits, partnership pilots, or listing programs—tell us what you are planning and we will route you to
                the right person quickly.
              </p>
            </div>
            <Button
              asChild
              className="h-11 shrink-0 border border-white/20 bg-white text-neutral-950 hover:bg-amber-50"
            >
              <Link href="/contact">Contact us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
