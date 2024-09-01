import { Avatar } from '@/components/avatar'
import { Image } from '@/components/image'
import { VerticalDots } from '@/icons'
import { Cat } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { CatActions } from './cat-actions'

type CatViewProps = {
  cat: Cat
  breedCat: Cat
  favoriteId?: string
  className?: string
}

export function CatView({
  cat,
  breedCat,
  className,
  favoriteId
}: CatViewProps) {
  const { url: catSrc, breeds } = cat
  const { url: breedCatSrc } = breedCat

  if (!breeds) return

  const {
    id: breedId,
    name: breedName,
    origin,
    description,
    temperament
  } = breeds[0]

  const tags = temperament.split(', ')

  return (
    <div
      className={cn(
        'relative mx-auto flex h-full w-full max-w-[975px] flex-1 flex-col items-center bg-white shadow-lg sm:max-h-[600px]',
        className
      )}
    >
      <div className="flex h-full w-full flex-col sm:flex-row">
        <div className="flex aspect-square w-full flex-grow flex-col sm:min-w-[360px]">
          <Image src={catSrc} fill alt="Cat image" />
        </div>
        <div className="flex w-full flex-col sm:max-w-[420px]">
          <div className="flex items-center justify-between gap-2 border-b p-6">
            <div className="flex items-center gap-2">
              <Link href={`/breeds/${breedId}`} className="inline-flex">
                <Avatar src={breedCatSrc} />
              </Link>

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  <Link href={`/breeds/${breedId}`}>
                    <h2 className="text-sm font-semibold">{breedName}</h2>
                  </Link>
                  <span className="cursor-default select-none text-xs">•</span>
                  <button className="inline-flex text-sm font-semibold text-[#0095f6]">
                    Follow
                  </button>
                </div>

                <p className="cursor-default text-xs">{origin}</p>
              </div>
            </div>
            <VerticalDots />
          </div>

          <div className="flex flex-col gap-2 p-6">
            <div className="line-clamp-4 text-sm">
              <span className="cursor-default font-semibold">{breedName}</span>{' '}
              {description}
            </div>
            <div className="inline-flex flex-wrap gap-1">
              {tags.map(tag => (
                <span
                  className="inline cursor-default text-xs text-[#0095f6]"
                  key={tag}
                >
                  # {tag.toLowerCase()}
                </span>
              ))}
            </div>
            <span className="cursor-default text-xs font-medium text-neutral-500">
              10w
            </span>
          </div>
          <div className="mt-auto border-t p-6">
            <CatActions cat={cat} favoriteId={favoriteId} />
            <div className="cursor-default text-sm font-semibold">
              38,289 likes
            </div>
            <div className="cursor-default text-xs text-neutral-500">
              June 18
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
