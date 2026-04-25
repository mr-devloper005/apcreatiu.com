import { Activity, CheckCircle2, Clock3, Server, ShieldCheck, Wifi } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  { name: 'Web app', status: 'Operational', detail: 'Pages, navigation, account screens, and listing discovery.', icon: Wifi },
  { name: 'API', status: 'Operational', detail: 'Publishing, authentication, and content access services.', icon: Server },
  { name: 'Media CDN', status: 'Operational', detail: 'Images, logos, listing photos, and downloadable assets.', icon: Activity },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed notifications', status: 'Resolved', note: 'Queue processing returned to normal after a provider retry window.' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved', note: 'New listings were searchable again after the index refresh completed.' },
]

const checks = ['Homepage available', 'Listing pages available', 'Uploads healthy', 'Search responsive']

export default function StatusPage() {
  return (
    <PageShell
      variant="brand"
      title="System status"
      description="A quick view of platform health across the web app, API, media delivery, and recent incidents."
    >
      <div className="space-y-12">
        <Card className="border-amber-200/70 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-lg">
          <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                All systems operational
              </div>
              <h2 className="mt-5 font-[family-name:var(--font-fraunces)] text-2xl font-semibold sm:text-3xl">
                Core discovery flows are running normally
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
                We monitor availability, indexing, and media delivery so visitors can browse listings and owners can keep
                profiles current without interruption.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">Current checks</p>
              <ul className="mt-4 space-y-3">
                {checks.map((check) => (
                  <li key={check} className="flex items-center gap-3 text-sm text-neutral-100">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map(({ name, status, detail, icon: Icon }) => (
            <Card key={name} className="border-neutral-200/90 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-900">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-neutral-950">{name}</h2>
                <Badge className="mt-3 bg-emerald-100 text-emerald-900 hover:bg-emerald-100">{status}</Badge>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <Card className="border-neutral-200/90 bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-amber-700" aria-hidden />
                <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                  Incident history
                </h3>
              </div>
              <div className="mt-6 space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.title} className="rounded-xl border border-neutral-200 bg-neutral-50/70 px-4 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{incident.date}</div>
                        <div className="mt-1 text-sm font-semibold text-neutral-950">{incident.title}</div>
                      </div>
                      <Badge variant="outline" className="border-neutral-300 text-neutral-700">{incident.status}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{incident.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200/70 bg-amber-50/60 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <ShieldCheck className="h-6 w-6 text-amber-800" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-neutral-950">Reliability promise</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                Status updates prioritize visitor-facing browsing, owner publishing, and the media assets listings depend
                on. Resolved incidents stay visible for context.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}