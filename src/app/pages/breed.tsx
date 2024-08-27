import { FC } from 'react';
import { BreedList } from '../components/breed-list/breed-list.tsx';
import { Container, Typography } from '@mui/material';

export const Breed: FC = () => {
  return (
    <Container>
      <Typography
        component="h1"
        variant="h4"
        sx={{ textAlign: 'center', padding: '1rem' }}
      >
        Breed Page
      </Typography>
      <BreedList />
    </Container>
  );
};
