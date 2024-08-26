import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeyFavourite } from './use-favourite.tsx';
import { addToFavourite } from '../../repository/favourite-helper.ts';

export const useAddFavourite = () => {
  const queryClient = useQueryClient();

  const { mutate: addFavourite, isPending } = useMutation({
    mutationFn: addToFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeyFavourite] });
    },
  });

  return {
    addFavourite,
    isPending,
  };
};
