import React from 'react';
import {Link} from 'react-router-dom';
import type {BreedImages} from 'cat-lover/types/breeds';
import styles from './styles.scss';

type BreedDetailsProps = {
  breedImages: BreedImages;
};

export const BreedDetails = ({breedImages}: BreedDetailsProps): JSX.Element => (
  <div className={styles.images}>
    {breedImages.map(image => (
      <Link key={image.id} to={`/cats/${image.id}`}>
        <img alt="Breed" src={image.url} />
      </Link>
    ))}
  </div>
);
