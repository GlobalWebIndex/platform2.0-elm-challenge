import { CatData } from '../types/cat.ts';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchBreeds = async (): Promise<CatData[]> => {
  const { data }: AxiosResponse<CatData[]> = await axiosClient.get(`/breeds`);

  return data;
};
