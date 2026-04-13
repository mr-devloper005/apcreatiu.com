import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const toc = [
  { id: "agreement", label: "Agreement" },
  { id: "accounts", label: "Accounts" },
  { id: "content", label: "Your content" },
  { id: "acceptable", label: "Acceptable use" },
  { id: "listings", label: "Listings" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "termination", label: "Termination" },
  { id: "law", label: "Governing law" },
];

const sections: { id: string; title: string; paragraphs: string[] }[] = [
  {
    id: "agreement",
    title: "Agreement to terms",
    paragraphs: [
      `These Terms of Service ("Terms") govern your access to and use of ${SITE_CONFIG.name} and related services. By creating an account, submitting a listing, or browsing the site, you agree to these Terms and to our Privacy Policy.`,
      "If you are using the platform on behalf of a company, you represent that you have authority to bind that organization.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts and security",
    paragraphs: [
      "You must provide accurate registration information and keep credentials confidential. You are responsible for activity that occurs under your account.",
      "We may suspend or terminate accounts that appear compromised, fraudulent, or in repeated violation of these Terms.",
    ],
  },
  {
    id: "content",
    title: "Your content and license to us",
    paragraphs: [
      "You retain ownership of content you submit (text, images, logos, and other materials). By publishing, you grant us a non-exclusive, worldwide, royalty-free license to host, display, distribute, and promote that content solely to operate and improve the directory.",
      "You confirm you have the rights to everything you upload and that your content does not infringe third-party rights or violate applicable law.",
    ],
  },
  {
    id: "acceptable",
    title: "Acceptable use",
    paragraphs: [
      "No harassment, hate speech, illegal goods or services, malware, or deceptive practices.",
      "No scraping, automated harvesting, or attempts to bypass rate limits or access controls without written permission.",
      "No misrepresentation of affiliation with other businesses, and no impersonation of individuals or organizations.",
    ],
  },
  {
    id: "listings",
    title: "Listings and commercial activity",
    paragraphs: [
      "Listings should describe real businesses or services. Prices, hours, and contact information should be kept accurate.",
      "Transactions between visitors and businesses happen directly between those parties unless we explicitly offer a separate payment product. We are not a party to those deals.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    paragraphs: [
      `The platform is provided "as is" without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement.`,
      "We do not guarantee uninterrupted availability and may change or discontinue features with reasonable notice when feasible.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    paragraphs: [
      "You may stop using the platform at any time. We may suspend or terminate access if you breach these Terms or if we must comply with law or protect other users.",
      "Provisions that by their nature should survive (including ownership, disclaimers, and liability limits) will survive termination.",
    ],
  },
  {
    id: "law",
    title: "Governing law and changes",
    paragraphs: [
      "We may update these Terms periodically. Material changes will be communicated through the product or by email when appropriate. Continued use after changes constitutes acceptance.",
    ],
  },
];

export default function TermsPage() {
  return (
    <PageShell
      variant="brand"
      title="Terms of service"
      description={`Rules and responsibilities for using ${SITE_CONFIG.name}.`}
    >
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <Card className="border-neutral-200/90 bg-white shadow-sm lg:sticky lg:top-24">
          <CardContent className="p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">On this page</p>
            <nav className="mt-4 space-y-2 text-sm" aria-label="Terms sections">
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
                  {section.id === "law" ? (
                    <p className="text-sm leading-relaxed text-neutral-600">
                      Questions?{" "}
                      <Link href="/contact" className="font-medium text-amber-800 underline-offset-4 hover:underline">
                        Contact the team
                      </Link>
                      .
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
