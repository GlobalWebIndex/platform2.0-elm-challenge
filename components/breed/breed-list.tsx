'use client'

import { Button } from '@/components/button'
import { Spinner } from '@/components/spinner'
import { useApi } from '@/hooks'
import { BreedWithImages } from '@/lib/types'
import { BreedCard } from './breed-card'

type BreedListProps = {
  breeds: BreedWithImages[]
}

export function BreedList({ breeds: initialBreeds }: BreedListProps) {
  const {
    data: breeds,
    loading,
    error,
    loadMore
  } = useApi<BreedWithImages>({
    url: '/api/breeds',
    initialData: initialBreeds,
    paginated: true
  })

  if (error)
    return (
      <p className="text-sm font-medium">
        There was an error fetching the breeds.
      </p>
    )

  if (!breeds) return null

  return (
    <>
      <div className="mb-8 grid w-full grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
        {breeds.map(breed => (
          <BreedCard
            key={breed.id}
            name={breed.name}
            avatarSrc={breed.avatarSrc}
            origin={breed.origin}
            href={`/breeds/${breed.id}`}
            cats={breed.cats}
          />
        ))}
      </div>
      {/* Here we could also handle the case whether ot not there are more breeds to load. */}
      <div className="mb-8">
        {loading ? (
          <Spinner />
        ) : (
          <Button variant="secondary" onClick={loadMore}>
            Load more breeds
          </Button>
        )}
      </div>
    </>
  )
}
