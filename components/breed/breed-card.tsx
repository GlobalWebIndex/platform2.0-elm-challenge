import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Image } from '@/components/image'
import { Cat } from '@/lib/types'
import Link from 'next/link'

type BreedCardProps = {
  name: string
  avatarSrc: string
  origin: string
  href: string
  cats: Cat[]
}

export function BreedCard({
  name,
  avatarSrc,
  origin,
  href,
  cats
}: BreedCardProps) {
  return (
    <article className="flex flex-col">
      <header className="mb-2 flex items-center justify-between gap-2 px-4 sm:px-1">
        <div className="flex items-center gap-2">
          <Link href={href} className="inline-flex">
            <Avatar src={avatarSrc} />
          </Link>
          <div className="flex flex-col items-start">
            <Link href={href}>
              <h2 className="text-sm font-semibold">{name}</h2>
            </Link>
            <p className="cursor-default text-xs">{origin}</p>
          </div>
        </div>
        <Button>Follow</Button>
      </header>
      <main>
        <div className="grid grid-cols-3 gap-1">
          {cats.map(cat => (
            <Link href={`cats/${cat.id}`} key={cat.id}>
              <figure className="aspect-square w-full">
                <Image src={cat.url} fill alt="Cat image" />
              </figure>
            </Link>
          ))}
        </div>
      </main>
    </article>
  )
}
