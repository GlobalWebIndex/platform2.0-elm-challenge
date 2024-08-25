import { BreedDetailsShort } from '../types/cat.ts';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchFavourites = async (): Promise<BreedDetailsShort[]> => {
  const { data }: AxiosResponse<BreedDetailsShort[]> =
    await axiosClient.get(`/breeds`);

  return data;
};
