import {CatData} from '../types/cat.ts';

const api_key = import.meta.env.VITE_API_KEY;

export const fetchCats = async (): Promise<CatData[]> => {
  const getCatParams = {
    limit: '10',
    has_breeds: '1',
    api_key,
  };

  const catQuery = new URLSearchParams(getCatParams).toString();

  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?${catQuery}`,
  );

  return response.json();
};
