import { Cat } from '@/lib/types'
import { useCallback, useState } from 'react'

export const useOptimisticFavorite = (
  initialFavorite: boolean,
  initialFavoriteId?: string
) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const toggleFavorite = useCallback(
    async (cat: Cat) => {
      if (isPending) return

      setIsPending(true)

      const newFavoriteStatus = !isFavorite
      setIsFavorite(newFavoriteStatus)

      try {
        if (!newFavoriteStatus) {
          if (initialFavoriteId) {
            const res = await fetch('/api/favorite', {
              cache: 'no-store',
              method: 'DELETE',
              body: JSON.stringify({ id: initialFavoriteId })
            })

            if (!res.ok) {
              setError('Failed to unfavorite cat.')
            }
          }
        } else {
          const res = await fetch('/api/favorite', {
            cache: 'no-store',
            method: 'POST',
            body: JSON.stringify({ id: cat.id })
          })

          if (!res.ok) {
            setError('Failed to favorite cat.')
          }
        }
      } catch (error) {
        setIsFavorite(!newFavoriteStatus)
        setError('Error toggling favorite cat.')
      } finally {
        setIsPending(false)
      }
    },
    [isFavorite, isPending, initialFavoriteId]
  )

  return { isFavorite, isPending, error, toggleFavorite }
}
