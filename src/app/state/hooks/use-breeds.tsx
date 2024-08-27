import { useQuery } from '@tanstack/react-query';
import { fetchBreeds } from '../../repository/fetch-breeds.ts';

export const queryKeyBreeds = 'breeds';
export const useBreeds = () => {
  const { isPending, error, data } = useQuery({
    queryKey: [queryKeyBreeds],
    queryFn: fetchBreeds,
  });

  return {
    data,
    error,
    isPending,
  };
};
