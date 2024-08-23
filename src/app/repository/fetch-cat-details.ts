import { CatData } from '../types/cat.ts';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchCatDetails = async (id: string): Promise<CatData> => {
  const { data }: AxiosResponse<CatData> = await axiosClient.get(
    `/images/${id}`,
  );

  return data;
};
