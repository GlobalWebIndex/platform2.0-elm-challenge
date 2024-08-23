import { FC } from 'react';
import { CatList } from '../components/cat-list/cat-list.tsx';
import { Container, Typography } from '@mui/material';

export const Home: FC = () => {
  return (
    <Container>
      <Typography
        component="h1"
        variant="h4"
        sx={{ textAlign: 'center', padding: '1rem' }}
      >
        Home Page
      </Typography>
      <CatList />
    </Container>
  );
};
