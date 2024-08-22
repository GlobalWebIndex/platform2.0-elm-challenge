import { CatData } from '../types/cat.ts';

export const fetchBreeds = async (): Promise<CatData[]> => {
  const response = await fetch('https://api.thecatapi.com/v1/breeds');

  return response.json();
};
