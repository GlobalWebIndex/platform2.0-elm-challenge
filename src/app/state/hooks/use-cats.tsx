import { useQuery } from '@tanstack/react-query';
import { fetchCats } from '../../repository/fetch-cats.ts';

export const queryKeyCats = 'cats';
export const useCats = () => {
  const { isPending, error, data } = useQuery({
    queryKey: [queryKeyCats],
    queryFn: fetchCats,
  });

  return {
    data,
    error,
    isPending,
  };
};
