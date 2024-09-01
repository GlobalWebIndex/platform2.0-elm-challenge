import { useState, useEffect, useCallback } from 'react'

interface UseApiOptions<T> {
  url: string
  initialData?: T[]
  paginated?: boolean
}

interface UseApiResult<T> {
  data: T[] | null
  loading: boolean
  error: Error | null
  loadMore?: () => Promise<void>
}

export function useApi<T>({
  url,
  initialData,
  paginated = false
}: UseApiOptions<T>): UseApiResult<T> {
  const [data, setData] = useState<T[] | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState(0)

  const fetchData = useCallback(async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const newData = await response.json()
      setData(prevData => (prevData ? [...prevData, ...newData] : newData))
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!initialData) {
      fetchData(url)
    }
  }, [url, initialData, fetchData])

  const loadMore = useCallback(async () => {
    if (!paginated) return
    const nextPage = page + 1
    await fetchData(`${url}?page=${nextPage}`)
    setPage(nextPage)
  }, [url, page, paginated, fetchData])

  const result: UseApiResult<T> = { data, loading, error }
  if (paginated) {
    result.loadMore = loadMore
  }

  return result
}
