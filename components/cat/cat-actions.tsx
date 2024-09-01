'use client'

import { useOptimisticFavorite } from '@/hooks'
import { Bookmark, CommentBubble, Heart, HeartFilled } from '@/icons'
import { Cat } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface CatProps {
  favoriteId?: string
  cat: Cat
}

export function CatActions({ cat, favoriteId }: CatProps) {
  const router = useRouter()
  const initialFavorite = !!favoriteId

  const { isFavorite, isPending, error, toggleFavorite } =
    useOptimisticFavorite(initialFavorite, favoriteId)

  const title = !isFavorite ? 'Add favorite' : 'Remove favorite'

  const handleFavorite = async () => {
    await toggleFavorite(cat)
    router.refresh()
  }

  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={handleFavorite}
          title={title}
          aria-label={title}
          disabled={isPending}
          className="inline-flex size-6 items-center justify-center transition-opacity hover:text-neutral-500 hover:opacity-85"
        >
          {!isFavorite ? <Heart /> : <HeartFilled className="text-red-500" />}
        </button>
        <CommentBubble />
      </div>
      <Bookmark />
      {error && (
        <div className="cursor-default text-sm text-amber-600">{error}</div>
      )}
    </div>
  )
}
