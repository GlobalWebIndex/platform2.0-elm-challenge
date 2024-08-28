import {useCallback, useEffect, useState} from 'react';
import type {CatList} from 'cat-lover/types/cats';

export const useFetchCats = (): {
  isFetching: boolean;
  isReFetching: boolean;
  list: CatList;
  reFetch: () => Promise<void>;
} => {
  const [list, setList] = useState<CatList>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isReFetching, setIsReFetching] = useState(false);

  const fetchCats = useCallback<() => Promise<void>>(
    () =>
      fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => response.json() as Promise<CatList>)
        .then(data => {
          setList(prevList => [...prevList, ...data]);
        })
        .finally(() => {
          setIsFetching(false);
        }),
    []
  );

  useEffect(() => {
    void fetchCats();
  }, []);

  const reFetch = useCallback<() => Promise<void>>(async () => {
    setIsReFetching(true);

    await fetchCats();

    setIsReFetching(false);
  }, [fetchCats]);

  return {isFetching, isReFetching, list, reFetch};
};
