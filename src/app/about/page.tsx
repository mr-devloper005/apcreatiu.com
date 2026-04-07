import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Categories covered", value: "35+" },
  { label: "Listings published", value: "8.6k+" },
  { label: "Visitor sessions", value: "120k/mo" },
];

const values = [
  {
    title: "Clarity for browsers",
    description:
      "Structured categories, locations, and filters help people compare businesses without wading through unrelated content.",
  },
  {
    title: "Fair for businesses",
    description:
      "Listings are designed to show what you do, where you are, and how to get in touch—so the right customers find you.",
  },
  {
    title: "One focus",
    description:
      "We concentrate on business listings only: no mixed feeds of articles, classifieds, or other formats competing for attention.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a business listings directory—built to connect people with local and online services through clear, comparable profiles.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/listings">Browse listings</Link>
          </Button>
          <Button asChild className="bg-neutral-950 text-white hover:bg-neutral-800">
            <Link href="/create/listing">List your business</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our focus</Badge>
            <h2 className="text-2xl font-semibold text-foreground">A directory, not a general-purpose feed</h2>
            <p className="text-sm text-muted-foreground">
              Visitors come here to discover businesses and services. Owners use the same platform to present accurate
              hours, categories, and contact paths. Everything on the site supports that single job.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-10 border-border bg-card">
        <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Questions or partnerships?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Reach our team for media, support, or listing programs.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/contact">Contact us</Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
