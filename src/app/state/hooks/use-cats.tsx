import { useQuery } from '@tanstack/react-query';
import { fetchCats } from '../../repository/fetch-cats.ts';
import { useCatPaginationContext } from '../cat-pagination-context/cat-pagination-context.tsx';

export const queryKeyCats = 'cats';
export const useCats = () => {
  const { limit } = useCatPaginationContext();

  const { isPending, error, data } = useQuery({
    queryKey: [queryKeyCats, limit],
    queryFn: () => fetchCats(String(limit)),
  });

  return {
    data,
    error,
    isPending,
  };
};
