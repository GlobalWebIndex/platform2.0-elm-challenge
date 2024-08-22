import * as React from 'react';
import { FC, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.ts';
import { Home } from '../../pages/home.tsx';
import { Breed } from '../../pages/breed.tsx';

export const Layout: FC = () => {
  return (
    <>
      <CssBaseline />

      {/*<Header />*/}

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
      </Routes>
    </>
  );
};
