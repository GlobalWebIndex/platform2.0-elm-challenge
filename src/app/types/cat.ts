export type CatData = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreedDetails[];
  favourite: unknown;
};

export type CatBreedDetails = {
  weight: unknown;
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  life_span: string;
  wikipedia_url: string;
};
