import { Cat } from '../types';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchCatDetails = async (id: string): Promise<Cat> => {
  const { data }: AxiosResponse<Cat> = await axiosClient.get(`/images/${id}`);

  return data;
};
