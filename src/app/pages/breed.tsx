import { FC } from 'react';
import { BreedList } from '../components/breed-list/breed-list.tsx';
import { Typography } from '@mui/material';

export const Breed: FC = () => {
  return (
    <>
      <Typography variant="h1">Breed Page</Typography>
      <BreedList />
    </>
  );
};
