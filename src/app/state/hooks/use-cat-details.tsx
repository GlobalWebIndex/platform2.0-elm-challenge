import { useQuery } from '@tanstack/react-query';
import { fetchCatDetails } from '../../repository/fetch-cat-details.ts';

export const queryKeyCatDetails = 'cat-details';
export const useCatDetails = (id: string) => {
  const { isPending, error, data } = useQuery({
    queryKey: [queryKeyCatDetails, id],
    queryFn: () => fetchCatDetails(id),
  });

  return {
    data,
    error,
    isPending,
  };
};
