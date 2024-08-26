import { Cat } from '../types';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchCats = async (): Promise<Cat[]> => {
  const getCatsParams = {
    limit: '10',
    has_breeds: '1',
  };

  const queryParams = new URLSearchParams(getCatsParams).toString();

  const { data }: AxiosResponse<Cat[]> = await axiosClient.get(
    `/images/search?${queryParams}`,
  );

  return data;
};
