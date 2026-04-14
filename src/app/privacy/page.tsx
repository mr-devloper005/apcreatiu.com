import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "collect", label: "What we collect" },
  { id: "use", label: "How we use data" },
  { id: "share", label: "Sharing & processors" },
  { id: "rights", label: "Your rights" },
  { id: "retention", label: "Retention" },
  { id: "contact", label: "Contact" },
];

const sections: { id: string; title: string; paragraphs: string[] }[] = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      `${SITE_CONFIG.name} ("we", "us") respects your privacy. This policy explains what we collect when you use our website and related services, why we collect it, and the choices you have.`,
      "By using the platform, you agree to this policy alongside our Terms of Service. If you do not agree, please discontinue use.",
    ],
  },
  {
    id: "collect",
    title: "Information we collect",
    paragraphs: [
      "Account details you provide, such as name, email address, and password (stored using industry-standard hashing—we never store plaintext passwords).",
      "Listing and profile content you submit, including descriptions, media URLs, business contact information, and categories you select.",
      "Technical data automatically logged when you use the site: approximate location derived from IP, device type, browser version, and timestamps. We use this for security and product analytics.",
      "Communications you send to support, which may be retained to resolve your request and improve our playbooks.",
    ],
  },
  {
    id: "use",
    title: "How we use information",
    paragraphs: [
      "Operate core features: authentication, publishing listings, search, and personalization of your dashboard.",
      "Maintain safety and integrity: detect abuse, enforce our acceptable use rules, and investigate suspicious activity.",
      "Measure and improve performance: understand which flows confuse users, fix bugs faster, and prioritize roadmap work.",
      "Send transactional emails (verification, password reset, critical alerts) and, where permitted, product updates you can opt out of.",
    ],
  },
  {
    id: "share",
    title: "Sharing and subprocessors",
    paragraphs: [
      "We do not sell your personal information. We share data only with service providers who help us run the platform—such as hosting, email delivery, and analytics—under contracts that limit use to providing services to us.",
      "We may disclose information if required by law, court order, or to protect the rights, property, or safety of our users and the public.",
      "Listings you publish are visible to visitors as part of the directory experience; do not include sensitive personal data in public fields.",
    ],
  },
  {
    id: "rights",
    title: "Your rights and choices",
    paragraphs: [
      "Depending on where you live, you may have rights to access, correct, delete, or export personal data, and to object to certain processing.",
      "You can update many account fields directly in settings. For other requests, contact us using the details below—we will verify your identity before fulfilling sensitive requests.",
      "You may opt out of non-essential cookies through our cookie controls where available, and manage marketing emails via the unsubscribe link.",
    ],
  },
  {
    id: "retention",
    title: "Retention",
    paragraphs: [
      "We keep account data while your account is active and for a reasonable period afterward to handle disputes, enforce agreements, and comply with law.",
      "Analytics logs are retained in shortened or aggregated form for a limited period unless a longer period is needed for security investigations.",
    ],
  },
];

const contactSection = {
  id: "contact",
  title: "Contact",
} as const;

export default function PrivacyPage() {
  return (
    <PageShell
      variant="brand"
      title="Privacy policy"
      description="How we collect, use, and protect personal information across the platform."
    >
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <Card className="border-neutral-200/90 bg-white shadow-sm lg:sticky lg:top-24">
          <CardContent className="p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">On this page</p>
            <nav className="mt-4 space-y-2 text-sm" aria-label="Privacy policy sections">
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
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <Card className="border-neutral-200/90 bg-white shadow-sm">
                <CardContent className="space-y-4 p-6 sm:p-8">
                  <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-neutral-600">
                      {p}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </section>
          ))}
          <section id={contactSection.id} className="scroll-mt-28">
            <Card className="border-neutral-200/90 bg-white shadow-sm">
              <CardContent className="space-y-4 p-6 sm:p-8">
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                  {contactSection.title}
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Questions about this policy or your data? Reach us at{" "}
                  <a
                    href={`mailto:privacy@${SITE_CONFIG.domain}`}
                    className="font-medium text-amber-800 underline-offset-4 hover:underline"
                  >
                    privacy@{SITE_CONFIG.domain}
                  </a>
                  , or use our{" "}
                  <Link href="/contact" className="font-medium text-amber-800 underline-offset-4 hover:underline">
                    contact form
                  </Link>{" "}
                  for routed requests.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
