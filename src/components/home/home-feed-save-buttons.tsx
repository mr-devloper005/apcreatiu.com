'use client'

import { useCallback, useEffect, useState } from 'react'
import { Bookmark, Heart } from 'lucide-react'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

export function ListingBookmarkButton({ postId }: { postId: string }) {
  const [savedIds, setSavedIds] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    setSavedIds(loadFromStorage<string[]>(storageKeys.listingSaves, []))
  }, [])

  const isSaved = savedIds.includes(postId)

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setSavedIds((prev) => {
        const wasSaved = prev.includes(postId)
        const nextIds = wasSaved
          ? prev.filter((id) => id !== postId)
          : Array.from(new Set([...prev, postId]))
        saveToStorage(storageKeys.listingSaves, nextIds)
        queueMicrotask(() => {
          toast({
            title: wasSaved ? 'Removed from saved' : 'Listing saved',
            description: wasSaved
              ? 'Removed from your saved listings.'
              : 'You can view saved listings on your dashboard.',
          })
        })
        return nextIds
      })
    },
    [postId, toast],
  )

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur transition hover:bg-white',
        isSaved ? 'text-amber-600' : 'text-neutral-700',
      )}
      aria-label={isSaved ? 'Remove saved listing' : 'Save listing'}
      aria-pressed={isSaved}
    >
      <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
    </button>
  )
}

export function ListingHeartButton({
  postId,
  className,
}: {
  postId: string
  className?: string
}) {
  const [heartIds, setHeartIds] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    setHeartIds(loadFromStorage<string[]>(storageKeys.listingHearts, []))
  }, [])

  const isHearted = heartIds.includes(postId)

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setHeartIds((prev) => {
        const was = prev.includes(postId)
        const nextIds = was ? prev.filter((id) => id !== postId) : Array.from(new Set([...prev, postId]))
        saveToStorage(storageKeys.listingHearts, nextIds)
        queueMicrotask(() => {
          toast({
            title: was ? 'Removed from favorites' : 'Added to favorites',
            description: was
              ? 'This listing is no longer in your favorites.'
              : 'We saved this to your favorites on this device.',
          })
        })
        return nextIds
      })
    },
    [postId, toast],
  )

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-md transition hover:bg-white',
        isHearted ? 'text-rose-600' : 'text-rose-500',
        className,
      )}
      aria-label={isHearted ? 'Remove favorite' : 'Favorite listing'}
      aria-pressed={isHearted}
    >
      <Heart className={cn('h-4 w-4', isHearted && 'fill-current')} />
    </button>
  )
}
