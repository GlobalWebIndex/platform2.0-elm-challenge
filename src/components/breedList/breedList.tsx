import React from 'react';
import {Outlet} from 'react-router';
import {Link} from 'react-router-dom';
import type {Breeds} from 'cat-lover/types/breeds';
import {useFetch} from '../../hooks/useFetch';
import {Loader} from '../loader';
import styles from './styles.scss';

export const BreedList = (): JSX.Element => {
  const {data, isFetching} = useFetch<Breeds>('breeds');

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className={styles.breeds}>
      {(data as Breeds).map(breed => (
        <Link className={styles.link} key={breed.id} to={breed.id}>
          {breed.name}
        </Link>
      ))}
      <Outlet />
    </div>
  );
};
