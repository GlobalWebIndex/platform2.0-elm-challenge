import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router';
import {BreedList} from './breedList';
import {CatDetailsPreview} from './catDetailsPreview';
import {CatList} from './catList';
import {Layout} from './layout';
import {Modal} from './modal';

export const App = (): JSX.Element => {
  const location = useLocation();
  const state = location.state as {backgroundLocation?: string} | null;

  return (
    <>
      <Routes location={state?.backgroundLocation ?? location}>
        <Route element={<Layout />} path="/">
          <Route element={<Navigate replace to="cats" />} index />
          <Route element={<CatList />} path="cats" />
          <Route element={<CatDetailsPreview />} path="cats/:id" />
          <Route element={<BreedList />} path="breeds">
            <Route element={<Modal />} path=":id" />
          </Route>
          <Route element={<Navigate replace to="cats" />} path="*" />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route element={<Modal />} path="cats/:id" />
        </Routes>
      )}
    </>
  );
};
