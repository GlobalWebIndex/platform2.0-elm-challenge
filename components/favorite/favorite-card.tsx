'use client'

import { Image } from '@/components/image'
import { useUnfavorite } from '@/hooks/use-unfavorite'
import { Bookmark, HeartFilled, VerticalDots } from '@/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type FavoriteCardProps = {
  favoriteId: string
  image: {
    id: string
    url: string
  }
}

export function FavoriteCard({ favoriteId, image }: FavoriteCardProps) {
  const router = useRouter()
  const { data, isPending, error, unfavorite } = useUnfavorite(favoriteId)

  const handleUnfavorite = async () => {
    await unfavorite()
    router.refresh()
  }

  return (
    <article
      className={cn(
        'flex w-full flex-col items-start',
        isPending && 'animate-pulse'
      )}
    >
      <header className="flex w-full items-center justify-end px-4 py-2 sm:px-1">
        <VerticalDots aria-label="More options" />
      </header>
      <Link
        href={`/cats/${image.id}`}
        className="inline-flex aspect-square w-full transition-opacity hover:opacity-95"
      >
        <Image src={image.url} fill alt="Cat image" />
      </Link>
      <div className="flex w-full items-center justify-between px-4 py-2 sm:px-1">
        <button
          onClick={handleUnfavorite}
          disabled={isPending}
          aria-label="Remove favorite"
          className="inline-flex size-6 items-center justify-center transition-opacity hover:opacity-85"
        >
          <HeartFilled className="text-red-500" />
        </button>
        <Bookmark />
      </div>
      <div className="flex flex-col px-4 sm:px-1">
        <div className="cursor-default text-sm font-semibold">38,289 likes</div>
        <div className="cursor-default text-xs text-neutral-500">June 18</div>
      </div>
      {error && (
        <div className="text-sm text-amber-600">
          There was an error removing the cat from favorites
        </div>
      )}
    </article>
  )
}
