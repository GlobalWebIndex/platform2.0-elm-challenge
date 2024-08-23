import { CatData } from '../types/cat.ts';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchCats = async (): Promise<CatData[]> => {
  const getCatsParams = {
    limit: '10',
    has_breeds: '1',
  };

  const queryParams = new URLSearchParams(getCatsParams).toString();

  const { data }: AxiosResponse<CatData[]> = await axiosClient.get(
    `/images/search?${queryParams}`,
  );

  return data;
};
