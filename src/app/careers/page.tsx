import Link from "next/link";
import { Coffee, HeartHandshake, Laptop, LineChart, Users } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const roles = [
  {
    title: "Product Designer",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    focus: "Craft end-to-end flows for owners publishing listings and visitors comparing options.",
  },
  {
    title: "Frontend Engineer",
    location: "New York, NY",
    type: "Full-time",
    level: "Senior",
    focus: "Ship accessible, fast interfaces in Next.js with a sharp eye for typography and motion.",
  },
  {
    title: "Community Lead",
    location: "Remote",
    type: "Part-time",
    level: "Mid",
    focus: "Support onboarding, gather qualitative feedback, and help shape trust & safety programs.",
  },
];

const benefits = [
  { icon: Laptop, label: "Remote-first", text: "Core hours with flexibility for deep work and life admin." },
  { icon: HeartHandshake, label: "Benefits", text: "Health, dental, and vision for full-time roles in supported regions." },
  { icon: LineChart, label: "Growth budget", text: "Annual stipend for courses, conferences, and tooling." },
  { icon: Coffee, label: "Team rituals", text: "Quarterly in-person summits and monthly virtual socials." },
];

const values = [
  "We bias toward clarity—internally and in the product.",
  "We respect craft: small teams, high ownership, visible outcomes.",
  "We listen to owners and visitors equally; both sides make the directory work.",
];

export default function CareersPage() {
  return (
    <PageShell
      variant="brand"
      title="Careers"
      description={`Join ${SITE_CONFIG.name} as we refine what a modern business directory feels like—calm, trustworthy, and genuinely useful.`}
      actions={
        <Button asChild className="bg-neutral-950 text-white hover:bg-neutral-800">
          <Link href="/contact">Introduce yourself</Link>
        </Button>
      }
    >
      <div className="space-y-12 lg:space-y-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Card className="border-amber-200/60 bg-gradient-to-br from-white via-amber-50/30 to-white shadow-sm">
            <CardContent className="space-y-4 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-amber-900">
                <Users className="h-5 w-5" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Why join</span>
              </div>
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-neutral-950 sm:text-3xl">
                Build the directory people open on purpose
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                We are a compact product team obsessed with search quality, owner workflows, and the micro-interactions
                that make a listing feel credible. If you like shipping polished UI and working closely with users, you
                will fit right in.
              </p>
              <ul className="space-y-3 pt-2">
                {values.map((v) => (
                  <li key={v} className="flex gap-3 text-sm text-neutral-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, label, text }) => (
              <Card key={label} className="border-neutral-200/90 bg-white shadow-sm">
                <CardContent className="p-5">
                  <Icon className="h-5 w-5 text-amber-700" aria-hidden />
                  <p className="mt-3 text-sm font-semibold text-neutral-950">{label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-neutral-950 sm:text-3xl">
            Open roles
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Don&apos;t see a perfect match? We still read every note—tell us what you would like to contribute.
          </p>
          <div className="mt-8 space-y-4">
            {roles.map((role) => (
              <Card
                key={role.title}
                className="border-neutral-200/90 bg-white shadow-sm transition-shadow hover:border-amber-200/80 hover:shadow-md"
              >
                <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-amber-100 text-amber-950 hover:bg-amber-100">{role.level}</Badge>
                      <Badge variant="outline" className="border-neutral-300">
                        {role.type}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-950">{role.title}</h3>
                    <p className="text-sm text-neutral-500">{role.location}</p>
                    <p className="text-sm leading-relaxed text-neutral-600">{role.focus}</p>
                  </div>
                  <Button variant="outline" asChild className="shrink-0 border-neutral-300 hover:bg-neutral-50">
                    <Link href="/contact">Apply</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
