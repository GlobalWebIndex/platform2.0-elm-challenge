import { BreedFullDetails } from '../types/cat.ts';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchBreeds = async (): Promise<BreedFullDetails[]> => {
  const { data }: AxiosResponse<BreedFullDetails[]> =
    await axiosClient.get(`/breeds`);

  return data;
};
