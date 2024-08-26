import { BreedDetailsFull } from '../types';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchBreeds = async (): Promise<BreedDetailsFull[]> => {
  const { data }: AxiosResponse<BreedDetailsFull[]> =
    await axiosClient.get(`/breeds`);

  return data;
};
