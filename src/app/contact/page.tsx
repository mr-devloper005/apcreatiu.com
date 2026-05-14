"use client";

import { useState } from "react";
import { Clock, MapPin, Send } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SITE_CONFIG } from "@/lib/site-config";
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

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
            <ContactLeadForm />
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

        </div>
      </div>
    </PageShell>
  );
}
