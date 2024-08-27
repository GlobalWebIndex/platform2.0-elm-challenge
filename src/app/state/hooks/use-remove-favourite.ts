import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeyFavourite } from './use-favourite.tsx';
import { removeFromFavourite } from '../../repository/favourite-helper.ts';

export const useRemoveFavourite = () => {
  const queryClient = useQueryClient();

  const { mutate: removeFavourite, isPending } = useMutation({
    mutationFn: removeFromFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeyFavourite] });
    },
  });

  return {
    removeFavourite,
    isPending,
  };
};
