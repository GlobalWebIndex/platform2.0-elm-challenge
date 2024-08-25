import { useQuery } from '@tanstack/react-query';
import { fetchBreedDetails } from '../../repository/fetch-breed-details.ts';

export const queryKeyBreedDetails = 'breed-details';
export const useBreedDetails = (id: string) => {
  const { isPending, error, data } = useQuery({
    queryKey: [queryKeyBreedDetails, id],
    queryFn: () => fetchBreedDetails(id),
  });

  return {
    data,
    error,
    isPending,
  };
};
