import * as React from 'react';
import { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.ts';
import { Home } from '../../pages/home.tsx';

export const Layout: FC = () => {
  return (
    <>
      <CssBaseline />

      {/*<Header />*/}

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        {/*<Route
                    path={ROUTES.SIGN_UP}
                    element={
                        <Suspense fallback={<FormSkeleton />}>
                            <SignUp />
                        </Suspense>
                    }
                />*/}
      </Routes>
    </>
  );
};
