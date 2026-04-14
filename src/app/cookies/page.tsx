import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const toc = [
  { id: "intro", label: "Introduction" },
  { id: "types", label: "Cookie types" },
  { id: "manage", label: "Manage preferences" },
  { id: "third", label: "Third parties" },
  { id: "updates", label: "Updates" },
];

const cookieTypes = [
  {
    name: "Strictly necessary",
    purpose: "Authentication sessions, security tokens, load balancing, and fraud prevention.",
    examples: "Session ID, CSRF token, cookie consent choice",
    retention: "Session or up to 12 months for security logs tied to your account.",
  },
  {
    name: "Functional",
    purpose: "Remember preferences such as locale, accessibility settings, and UI density.",
    examples: "Theme preference, sort order on saved searches",
    retention: "Up to 12 months, unless you clear them sooner.",
  },
  {
    name: "Analytics",
    purpose: "Aggregated insight into navigation patterns so we can improve search and onboarding.",
    examples: "Anonymous page views, referral source, device class",
    retention: "Typically 13–26 months in aggregated or pseudonymous form.",
  },
  {
    name: "Marketing (optional)",
    purpose: "Measure campaign performance when you arrive from ads or partner links.",
    examples: "Attribution parameters, conversion pixels where enabled",
    retention: "As allowed by the partner and your consent choices.",
  },
];

export default function CookiesPage() {
  return (
    <PageShell
      variant="brand"
      title="Cookie policy"
      description="Transparency about cookies, similar technologies, and how you can control them."
    >
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <Card className="border-neutral-200/90 bg-white shadow-sm lg:sticky lg:top-24">
          <CardContent className="p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">On this page</p>
            <nav className="mt-4 space-y-2 text-sm" aria-label="Cookie policy sections">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-md px-2 py-1.5 text-neutral-600 transition hover:bg-amber-50 hover:text-neutral-950"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="mt-6 border-t border-neutral-200 pt-4 text-xs text-neutral-500">Last updated: April 13, 2026</p>
          </CardContent>
        </Card>

        <div className="space-y-10">
          <section id="intro" className="scroll-mt-28">
            <Card className="border-neutral-200/90 bg-white shadow-sm">
              <CardContent className="space-y-4 p-6 sm:p-8">
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                  Introduction
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  We use cookies and similar technologies (such as local storage) to run the platform, remember your
                  choices, and understand how features perform. This page summarizes what we use and why.
                </p>
                <p className="text-sm leading-relaxed text-neutral-600">
                  For personal data processing beyond cookies, see our{" "}
                  <Link href="/privacy" className="font-medium text-amber-800 underline-offset-4 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="types" className="scroll-mt-28">
            <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
              Types of cookies
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-neutral-600">
              Each category below can include multiple cookies. Names may change as we ship improvements, but the purpose
              stays within these buckets.
            </p>
            <div className="mt-6 grid gap-4">
              {cookieTypes.map((row) => (
                <Card key={row.name} className="border-amber-200/50 bg-gradient-to-br from-white to-amber-50/20 shadow-sm">
                  <CardContent className="space-y-3 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-neutral-950">{row.name}</h3>
                      {row.name === "Strictly necessary" ? (
                        <Badge className="bg-neutral-900 text-white hover:bg-neutral-900">Always on</Badge>
                      ) : null}
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      <span className="font-semibold text-neutral-800">Purpose: </span>
                      {row.purpose}
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      <span className="font-semibold text-neutral-800">Examples: </span>
                      {row.examples}
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      <span className="font-semibold text-neutral-800">Typical retention: </span>
                      {row.retention}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="manage" className="scroll-mt-28">
            <Card className="border-neutral-200/90 bg-white shadow-sm">
              <CardContent className="space-y-4 p-6 sm:p-8">
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                  Managing preferences
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Where available, use the cookie banner or preference center to toggle non-essential categories. You can
                  also control cookies through your browser settings—note that blocking strictly necessary cookies may
                  break sign-in or security features.
                </p>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Need help?{" "}
                  <Link href="/help" className="font-medium text-amber-800 underline-offset-4 hover:underline">
                    Visit help &amp; support
                  </Link>{" "}
                  or{" "}
                  <Link href="/contact" className="font-medium text-amber-800 underline-offset-4 hover:underline">
                    contact us
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="third" className="scroll-mt-28">
            <Card className="border-neutral-200/90 bg-white shadow-sm">
              <CardContent className="space-y-4 p-6 sm:p-8">
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                  Third-party services
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Some pages may load content or scripts from analytics or infrastructure partners. Those providers may set
                  their own cookies subject to their policies. We choose partners with strong privacy practices and
                  minimize data shared with them.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="updates" className="scroll-mt-28">
            <Card className="border-neutral-200/90 bg-white shadow-sm">
              <CardContent className="space-y-4 p-6 sm:p-8">
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                  Updates
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  When we materially change how cookies are used, we will refresh this page and, when required, prompt you
                  to review your choices again.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
