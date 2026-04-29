'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Download, FileText, Newspaper } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

const pressNotes = [
  'Directory-first product experience for local and service businesses.',
  'Fresh logo, screenshots, and brand assets ready for editorial use.',
  'Fast media response for launch stories, trend pieces, and founder notes.',
]

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      variant="brand"
      title="Press"
      description="Brand assets, coverage notes, and media resources for stories about modern business discovery."
    >
      <div className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Card className="border-amber-200/70 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-amber-300">
                <Newspaper className="h-5 w-5" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-[0.22em]">Media brief</span>
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-2xl font-semibold sm:text-3xl">
                A calmer way to find businesses worth knowing
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Apcreatiu brings structured listings, clean comparison, and owner-friendly publishing into one focused
                destination. The story is simple: less marketplace noise, more useful business discovery.
              </p>
              <ul className="mt-6 space-y-3">
                {pressNotes.map((note) => (
                  <li key={note} className="flex gap-3 text-sm text-neutral-200">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-neutral-200/90 bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-700" aria-hidden />
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-neutral-950 sm:text-2xl">
                  Press kit
                </h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Download logos, screenshots, and concise brand material for editorial use.
              </p>
              <div className="mt-6 grid gap-3">
                {mockPressAssets.map((asset) => (
                  <div key={asset.id} className="rounded-xl border border-neutral-200/90 bg-neutral-50/70 px-4 py-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-neutral-950">{asset.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-600">{asset.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-amber-300 text-amber-950">
                          {asset.fileType}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => setActiveAssetId(asset.id)}>
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="bg-neutral-950 text-white hover:bg-neutral-800"
                          onClick={() =>
                            toast({
                              title: 'Download started',
                              description: `${asset.title} is downloading.`,
                            })
                          }
                        >
                          <Download className="mr-1.5 h-3.5 w-3.5" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-neutral-950 sm:text-3xl">
                Recent coverage
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Selected mentions and story angles from the directory and local discovery space.
              </p>
            </div>
            <Button variant="outline" className="border-neutral-300">
              Media contact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {mockPressCoverage.map((item) => (
              <Card
                key={item.id}
                className="border-neutral-200/90 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">{item.outlet}</div>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-neutral-950">{item.headline}</p>
                  <p className="mt-4 text-xs text-neutral-500">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-amber-200/70 bg-gradient-to-r from-amber-50/80 via-white to-white shadow-sm">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-lg font-semibold text-neutral-950">Need a custom asset or quote?</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Send deadline, publication, and asset needs. We will route the request quickly.
              </p>
            </div>
            <Button
              className="bg-neutral-950 text-white hover:bg-neutral-800"
              onClick={() =>
                toast({
                  title: 'Press request noted',
                  description: 'Please email press details through the contact page.',
                })
              }
            >
              Request assets
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-neutral-600">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="bg-neutral-950 text-white hover:bg-neutral-800"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}