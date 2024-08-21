import { FC } from 'react';
import { CatList } from '../components/cat-list/cat-list.tsx';

export const Home: FC = () => {
  return (
    <>
      <h1>Home Page</h1>
      <CatList />
    </>
  );
};
