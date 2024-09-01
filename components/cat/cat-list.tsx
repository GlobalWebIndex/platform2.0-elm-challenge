'use client'

import { Button } from '@/components/button'
import { Image } from '@/components/image'
import { Spinner } from '@/components/spinner'
import { useApi } from '@/hooks'
import { Cat } from '@/lib/types'
import Link from 'next/link'

type CatListProps = {
  cats: Cat[]
}

export function CatList({ cats: initialCats }: CatListProps) {
  const {
    data: cats,
    loading,
    error,
    loadMore
  } = useApi<Cat>({
    url: '/api/cats',
    initialData: initialCats,
    paginated: true
  })

  if (error)
    return (
      <p className="text-sm font-medium">
        There was an error fetching the cats.
      </p>
    )

  if (!cats) return null

  return (
    <>
      <ul className="mb-8 grid w-full grid-cols-2 gap-0.5 sm:grid-cols-3 sm:gap-1">
        {cats.map(cat => (
          <li key={cat.id} className="transition-opacity hover:opacity-90">
            <Link href={`/cats/${cat.id}`}>
              <div className="aspect-square">
                <Image src={cat.url} fill alt="Cat image" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mb-8 flex flex-col">
        {loading ? (
          <Spinner />
        ) : (
          <Button variant="secondary" onClick={loadMore}>
            Load more cats
          </Button>
        )}
      </div>
    </>
  )
}
