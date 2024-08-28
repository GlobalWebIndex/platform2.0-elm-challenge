import {useCallback, useEffect, useMemo, useState} from 'react';

export const useFetch = <T>(
  endpoint: string
): {abort: () => void; data: T | null; error: Error | null; isFetching: boolean} => {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/${endpoint}`, {
      signal: abortController.signal
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        return response.json() as T;
      })
      .then(response => {
        setData(response);
      })
      .catch((e: unknown) => {
        if ((e as Error).name === 'AbortError') {
          return;
        }

        setError(e as Error);
      })
      .finally(() => {
        setIsFetching(false);
      });

    return (): void => {
      abortController.abort();
    };
  }, [abortController, endpoint]);

  const abort = useCallback<() => void>(() => {
    abortController.abort();
  }, [abortController]);

  return {abort, data, error, isFetching};
};
