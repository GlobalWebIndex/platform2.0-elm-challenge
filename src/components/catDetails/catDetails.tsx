import React from 'react';
import classnames from 'classnames';
import type {Cat} from 'cat-lover/types/cats';
import {BreedInfo} from './breedInfo';
import styles from './styles.scss';

type CatDetailsProps = {
  cat: Cat;
};

export const CatDetails = ({cat}: CatDetailsProps): JSX.Element => {
  const hasBreeds = Boolean(cat.breeds?.length);
  const isHorizontalLayout = cat.width / cat.height <= 1;

  return (
    <div className={styles.container}>
      {isHorizontalLayout ? (
        <div
          className={classnames(styles.horizontal, {
            [styles.withNoBreeds]: !hasBreeds
          })}
        >
          <div className={styles.image}>
            <img alt="Cat" src={cat.url} />
          </div>
          {hasBreeds && <BreedInfo cat={cat} className={styles.breeds} />}
        </div>
      ) : (
        <div className={styles.vertical}>
          <div className={styles.image}>
            <img alt="Cat" src={cat.url} />
          </div>
          {hasBreeds && <BreedInfo cat={cat} className={styles.breeds} />}
        </div>
      )}
    </div>
  );
};
