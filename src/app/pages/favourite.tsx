import { FC } from 'react';
import { Container, Typography } from '@mui/material';
import { FavouriteList } from '../components/favourite-list/favourite-list.tsx';

export const Favourite: FC = () => {
  return (
    <Container>
      <Typography
        component="h1"
        variant="h4"
        sx={{ textAlign: 'center', padding: '1rem' }}
      >
        Favourites Page
      </Typography>
      <FavouriteList />
    </Container>
  );
};
