import { AddFavorite, Favourite, RemoveFavorite } from '../types';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchFavourite = async (): Promise<Favourite[]> => {
  const { data }: AxiosResponse<Favourite[]> =
    await axiosClient.get(`/favourites`);

  return data;
};

export const addToFavourite = async (imageId: string): Promise<AddFavorite> => {
  const { data }: AxiosResponse<AddFavorite> = await axiosClient.post(
    `/favourites`,
    { image_id: imageId },
  );

  return data;
};

export const removeFromFavourite = async (
  favouriteId: number,
): Promise<RemoveFavorite> => {
  const { data }: AxiosResponse<RemoveFavorite> = await axiosClient.delete(
    `/favourites/${favouriteId}`,
  );

  return data;
};
