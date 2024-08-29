import React from 'react';
import styles from './styles.scss';

type CatProps = {
  url: string;
};

export const Cat = ({url}: CatProps): JSX.Element => <img alt="Cat" className={styles.image} src={url} />;
