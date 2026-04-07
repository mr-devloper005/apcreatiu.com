import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/config/site.content";

export function CTASection() {
  const copy = siteContent.home.listify;

  return (
    <section className="relative overflow-hidden border-t border-neutral-200/90">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.35) 100%), url(/placeholder.svg?height=600&width=1920)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1600px] flex-col items-start gap-8 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.35rem]">
            {copy.ctaBannerTitle}
          </h2>
          <p className="mt-3 text-sm text-white/75 sm:text-base">
            {siteContent.cta.description}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="h-12 shrink-0 rounded-lg bg-white px-8 font-semibold text-neutral-950 shadow-lg hover:bg-neutral-100"
        >
          <Link href={siteContent.cta.primaryCta.href} className="inline-flex items-center gap-2">
            <Play className="h-4 w-4 fill-current" />
            {copy.ctaBannerButton}
          </Link>
        </Button>
      </div>
    </section>
  );
}
