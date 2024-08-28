import React from 'react';
import Icons from '../../assets/svg/icons.svg';
import styles from './styles.scss';

export const Loader = (): JSX.Element => (
  <div className={styles.loader}>
    <svg>
      <use href={`${Icons}#icon-cw`}></use>
    </svg>
  </div>
);
