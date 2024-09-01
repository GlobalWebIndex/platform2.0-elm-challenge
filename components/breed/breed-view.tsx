import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Image } from '@/components/image'
import { Cat } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type BreedViewProps = {
  cats: Cat[]
  breedCat: Cat
  className?: string
}

export function BreedView({ cats, breedCat, className }: BreedViewProps) {
  const { url: breedCatSrc, breeds } = breedCat

  if (!breeds) return

  const { name: breedName, origin, description, temperament } = breeds[0]

  const tags = temperament.split(', ')
  return (
    <div
      className={cn(
        'relative mx-auto flex h-full w-full flex-1 flex-col items-center bg-white shadow-lg sm:h-auto sm:max-h-[600px] sm:max-w-[500px]',
        className
      )}
    >
      <div className="flex w-full flex-col">
        <div className="grid w-full grid-cols-3 gap-1">
          {cats.map(cat => (
            <Link
              href={`/cats/${cat.id}`}
              className="inline-flex aspect-square"
              key={cat.id}
            >
              <Image src={cat.url} fill alt="Cat image" />
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between gap-2 p-6 pb-0">
          <div className="flex items-center gap-2">
            <Avatar src={breedCatSrc} />
            <div className="flex flex-col items-start">
              <h2 className="cursor-default text-sm font-semibold">
                {breedName}
              </h2>
              <p className="cursor-default text-xs">{origin}</p>
            </div>
          </div>
          <Button>Follow</Button>
        </div>
        <div className="p-6 pt-4">
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
        </div>
      </div>
    </div>
  )
}
