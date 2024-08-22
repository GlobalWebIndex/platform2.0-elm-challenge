import { CatData } from '../types/cat.ts';

export const fetchCatDetails = async (id: string): Promise<CatData> => {
  const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`);

  return response.json();
};
