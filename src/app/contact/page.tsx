"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { SITE_CONFIG } from "@/lib/site-config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const contactOptions = useMemo(
    () => [
      {
        title: "General support",
        detail: `support@${SITE_CONFIG.domain}`,
        tag: "Email",
        blurb: "Account access, listing edits, and technical issues.",
      },
      {
        title: "Partnerships",
        detail: `partners@${SITE_CONFIG.domain}`,
        tag: "Business",
        blurb: "Integrations, co-marketing, and enterprise directory programs.",
      },
      {
        title: "Press & media",
        detail: `press@${SITE_CONFIG.domain}`,
        tag: "Media",
        blurb: "Logos, factsheets, and interview requests.",
      },
    ],
    []
  );

  return (
    <PageShell
      variant="brand"
      title="Contact"
      description={`Reach ${SITE_CONFIG.name} for support, partnerships, or press—we read every message and route it to the right teammate.`}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <Card className="border-amber-200/70 bg-white shadow-md ring-1 ring-amber-100/50">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-amber-700" aria-hidden />
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                Send a message
              </h2>
            </div>
            <p className="mt-2 text-sm text-neutral-600">
              Include your listing URL or account email if the request is account-specific—it helps us answer faster.
            </p>
            <form
              className="mt-8 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
                toast({
                  title: "Message sent",
                  description: `Thanks for reaching out to ${SITE_CONFIG.name}. We will reply soon.`,
                });
              }}
            >
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-neutral-900">
                  Name
                </label>
                <Input id="contact-name" className="mt-2 h-11 border-neutral-200 bg-neutral-50/50" placeholder="Jane Doe" />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-neutral-900">
                  Email
                </label>
                <Input
                  id="contact-email"
                  className="mt-2 h-11 border-neutral-200 bg-neutral-50/50"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-neutral-900">
                  How can we help?
                </label>
                <Textarea
                  id="contact-message"
                  className="mt-2 min-h-[160px] border-neutral-200 bg-neutral-50/50"
                  placeholder="Tell us what you need—support ticket, partnership idea, or press deadline."
                />
              </div>
              <Button type="submit" className="h-11 bg-neutral-950 px-8 text-white hover:bg-neutral-800">
                Send message
              </Button>
              {submitted ? (
                <p className="text-sm text-neutral-600">Thanks! We aim to reply within two business days.</p>
              ) : null}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-neutral-200/90 bg-gradient-to-br from-neutral-950 to-neutral-900 text-white shadow-lg">
            <CardContent className="space-y-4 p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden />
                <div>
                  <h3 className="text-sm font-semibold">Response hours</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-300">
                    Monday–Friday, 9:00–18:00 local time. Messages outside those hours are queued for the next business
                    day.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden />
                <div>
                  <h3 className="text-sm font-semibold">Headquarters</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-300">
                    Distributed team across North America and Europe. No walk-in lobby—email is the fastest path.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {contactOptions.map((option) => (
            <Card key={option.title} className="border-neutral-200/90 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-950 hover:bg-amber-100">{option.tag}</Badge>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-950">{option.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{option.blurb}</p>
                <a
                  href={`mailto:${option.detail}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-amber-800 underline-offset-4 hover:underline"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {option.detail}
                </a>
              </CardContent>
            </Card>
          ))}

          <p className="px-1 text-center text-xs text-neutral-500 lg:text-left">
            Prefer self-serve?{" "}
            <Link href="/help" className="font-medium text-neutral-800 underline-offset-4 hover:underline">
              Browse the help center
            </Link>
            .
          </p>
        </div>
      </div>
    </PageShell>
  );
}
