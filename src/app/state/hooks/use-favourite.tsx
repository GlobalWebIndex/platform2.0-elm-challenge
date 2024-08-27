import { useQuery } from '@tanstack/react-query';
import { fetchFavourite } from '../../repository/favourite-helper.ts';

export const queryKeyFavourite = 'favourite';
export const useFavourite = () => {
  const { isPending, error, data } = useQuery({
    queryKey: [queryKeyFavourite],
    queryFn: fetchFavourite,
  });

  return {
    data,
    error,
    isPending,
  };
};
