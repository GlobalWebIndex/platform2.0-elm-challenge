export type Breed = {
  country_code: string;
  country_codes: string;
  id: string;
  life_span: string;
  name: string;
  origin: string;
  temperament: string;
  weight: {imperial: string; metric: string};
  wikipedia_url: string;
};

export type Breeds = Breed[];

export type BreedImage = {
  height: number;
  id: string;
  url: string;
  width: number;
};

export type BreedImages = BreedImage[];
