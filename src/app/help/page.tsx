import Link from "next/link";
import { BookOpen, LifeBuoy, ListChecks, MessageCircle, Search, Shield } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mockFaqs } from "@/data/mock-data";

const guides = [
  {
    icon: BookOpen,
    title: "Getting started",
    body: "Create an account, verify your email, and bookmark the dashboard—everything you publish routes through one place.",
    href: "/register",
    cta: "Create account",
  },
  {
    icon: ListChecks,
    title: "Listings & profiles",
    body: "Learn how categories, locations, and media slots appear to visitors so you can prepare assets before you publish.",
    href: "/create/listing",
    cta: "Start a listing",
  },
  {
    icon: Shield,
    title: "Trust & safety",
    body: "Report inaccurate listings, understand how we review flagged content, and keep your business information current.",
    href: "/contact",
    cta: "Report an issue",
  },
];

const quickTips = [
  "Use the short summary for the hook—full description can carry detail and formatting.",
  "Add at least one clear contact path: email, phone, or website.",
  "Refresh hours seasonally; outdated hours are the top reason visitors bounce.",
];

export default function HelpPage() {
  return (
    <PageShell
      variant="brand"
      title="Help & support"
      description="Guides, FAQs, and direct lines to our team—everything you need to get unblocked."
      actions={
        <Button asChild className="bg-neutral-950 text-white hover:bg-neutral-800">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="space-y-12 lg:space-y-16">
        <Card className="border-amber-200/60 bg-white shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <label htmlFor="help-search" className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
              <Search className="h-4 w-4 text-amber-700" aria-hidden />
              Search help topics
            </label>
            <p className="mt-1 text-xs text-neutral-500">
              Tip: open your browser&apos;s find tool (Ctrl+F) on this page to jump within FAQs.
            </p>
            <Input
              id="help-search"
              placeholder="e.g. listings, account, password…"
              className="mt-4 h-12 border-neutral-200 bg-neutral-50/80 text-base"
            />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {guides.map(({ icon: Icon, title, body, href, cta }) => (
            <Card
              key={title}
              className="flex flex-col border-neutral-200/90 bg-gradient-to-b from-white to-neutral-50/50 shadow-sm"
            >
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100/90 text-amber-900">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-neutral-950">{title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{body}</p>
                <Button variant="outline" asChild className="mt-6 border-neutral-300 hover:bg-white">
                  <Link href={href}>{cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <Card className="border-neutral-200/90 bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-amber-700" aria-hidden />
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                  Frequently asked questions
                </h2>
              </div>
              <Accordion type="single" collapsible className="mt-6 w-full">
                {mockFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-neutral-200">
                    <AccordionTrigger className="text-left text-sm font-medium text-neutral-900 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-neutral-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-amber-200/70 bg-amber-50/40 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-amber-950">
                  <LifeBuoy className="h-5 w-5" aria-hidden />
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em]">Listing checklist</h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {quickTips.map((tip) => (
                    <li key={tip} className="text-sm leading-relaxed text-neutral-700">
                      <span className="mr-2 font-semibold text-amber-800">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-neutral-200/90 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-neutral-950">Still stuck?</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Send a message with screenshots if you can—we typically respond within two business days.
                </p>
                <Button asChild className="mt-4 w-full bg-neutral-950 text-white hover:bg-neutral-800 sm:w-auto">
                  <Link href="/contact">Open contact form</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
