import { FC, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.ts';
import { Breed, Favourite, Home } from '../../pages';
import { Header } from '../header/header.tsx';

export const Layout: FC = () => {
  return (
    <>
      <CssBaseline />

      <Header />

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route
          path={ROUTES.BREED}
          element={
            <Suspense fallback={/*<FormSkeleton />*/ 'Loading...'}>
              <Breed />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.FAVOURITE}
          element={
            <Suspense fallback={/*<FormSkeleton />*/ 'Loading...'}>
              <Favourite />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
