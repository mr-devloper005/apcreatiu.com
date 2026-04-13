import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const acknowledgements = [
  { name: "Next.js", license: "MIT", notice: "Copyright Vercel, Inc. — App Router, image optimization, and tooling." },
  { name: "React", license: "MIT", notice: "Copyright Meta Platforms, Inc. and affiliates." },
  { name: "Tailwind CSS", license: "MIT", notice: "Copyright Tailwind Labs, Inc." },
  { name: "Radix UI", license: "MIT", notice: "Accessible primitives for dialogs, menus, accordions, and more." },
  { name: "Lucide", license: "ISC", notice: "Icon set used across navigation and marketing surfaces." },
  { name: "Zod", license: "MIT", notice: "Schema validation for forms and API payloads." },
  { name: "React Hook Form", license: "MIT", notice: "Form state management and performance-focused inputs." },
  { name: "date-fns", license: "MIT", notice: "Lightweight date utilities for formatting and parsing." },
  { name: "Recharts", license: "MIT", notice: "Charting components for dashboards and analytics views." },
  { name: "Framer Motion", license: "MIT", notice: "Animation primitives for interactive UI." },
  { name: "Embla Carousel", license: "MIT", notice: "Carousel engine for media galleries." },
  { name: "cmdk", license: "MIT", notice: "Command palette UX patterns." },
  { name: "Vaul", license: "MIT", notice: "Drawer component built on Radix primitives." },
  { name: "class-variance-authority", license: "Apache-2.0", notice: "Variant styling helper for UI components." },
  { name: "clsx & tailwind-merge", license: "MIT", notice: "Conditional className composition utilities." },
];

export default function LicensesPage() {
  return (
    <PageShell
      variant="brand"
      title="Licenses"
      description="Open-source software and notices for components that power this experience."
    >
      <div className="space-y-10">
        <Card className="border-amber-200/60 bg-gradient-to-r from-amber-50/80 via-white to-white shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-neutral-700">
              We are grateful to the maintainers behind these projects. The summaries below are informational; refer to
              each package&apos;s repository for the full license text. If you believe a notice is missing or incorrect,{" "}
              <Link href="/contact" className="font-medium text-amber-800 underline-offset-4 hover:underline">
                let us know
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-sm">
          <div className="grid grid-cols-[minmax(0,1.4fr)_100px_minmax(0,1.6fr)] gap-0 border-b border-neutral-200 bg-neutral-50/90 px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 sm:px-6">
            <span>Project</span>
            <span className="text-center sm:text-left">License</span>
            <span className="hidden sm:block">Notice</span>
          </div>
          <ul className="divide-y divide-neutral-200">
            {acknowledgements.map((row) => (
              <li
                key={row.name}
                className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1.4fr)_100px_minmax(0,1.6fr)] sm:items-center sm:px-6"
              >
                <span className="font-semibold text-neutral-950">{row.name}</span>
                <div className="flex sm:block">
                  <Badge variant="outline" className="border-amber-300/80 text-amber-950">
                    {row.license}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 sm:col-span-1">{row.notice}</p>
              </li>
            ))}
          </ul>
        </div>

        <Card className="border-neutral-200/90 bg-white shadow-sm">
          <CardContent className="space-y-3 p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-fraunces)] text-lg font-semibold text-neutral-950 sm:text-xl">
              MIT license (typical)
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
              documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including
              without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
              following conditions: The above copyright notice and this permission notice shall be included in all copies
              or substantial portions of the Software.
            </p>
            <p className="text-sm leading-relaxed text-neutral-600">
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
              NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
              EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
              AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
              USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
