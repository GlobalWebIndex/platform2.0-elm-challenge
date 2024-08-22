import { CatData } from '../types/cat.ts';

const api_key = import.meta.env.VITE_API_KEY;

export const fetchCats = async (): Promise<CatData[]> => {
  const getCatsParams = {
    limit: '10',
    has_breeds: '1',
    api_key,
  };

  const queryParams = new URLSearchParams(getCatsParams).toString();

  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?${queryParams}`,
  );

  return response.json();
};
