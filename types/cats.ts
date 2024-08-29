import type {Breed} from './breeds';

export type Cat = {
  breeds?: Breed[];
  height: number;
  id: string;
  url: string;
  width: number;
};

export type CatList = Cat[];
