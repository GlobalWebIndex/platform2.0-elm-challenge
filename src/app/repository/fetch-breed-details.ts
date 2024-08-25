import { BreedDetailsShort } from '../types/cat.ts';
import { AxiosResponse } from 'axios';
import { axiosClient } from '../http/axios-client/axios-client.ts';

export const fetchBreedDetails = async (
  id: string,
): Promise<BreedDetailsShort[]> => {
  const getCatsParams = {
    limit: '100',
    breed_ids: id,
  };

  const queryParams = new URLSearchParams(getCatsParams).toString();

  const { data }: AxiosResponse<BreedDetailsShort[]> = await axiosClient.get(
    `/images/search?${queryParams}`,
  );

  return data;
};
