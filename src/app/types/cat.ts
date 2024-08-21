export type CatData = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreed[];
  favourite: unknown;
};

export type CatBreed = {
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
