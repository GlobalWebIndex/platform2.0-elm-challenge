import { useCallback, useState } from 'react'

export function useUnfavorite(id: string) {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const unfavorite = useCallback(async () => {
    if (isPending) return

    setIsPending(true)
    setError('')

    try {
      const res = await fetch('/api/favorite', {
        cache: 'no-store',
        method: 'DELETE',
        body: JSON.stringify({ id })
      })

      if (!res.ok) {
        setError('Unable to remove image from favorites')
      }

      const data = await res.json()

      setData(data)
    } catch (err) {
      setData(null)
      setError('There was an error while removing image from favorites')
    } finally {
      setIsPending(false)
    }
  }, [data, isPending, error])

  return { data, isPending, error, unfavorite }
}
