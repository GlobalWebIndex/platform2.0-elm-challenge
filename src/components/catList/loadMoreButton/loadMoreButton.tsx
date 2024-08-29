import React from 'react';
import styles from './styles.scss';

type LoadMoreButtonProps = {
  isDisabled: boolean;
  onLoadMore: () => void;
};

export const LoadMoreButton = ({isDisabled, onLoadMore}: LoadMoreButtonProps): JSX.Element => (
  <button className={styles.loadMore} disabled={isDisabled} onClick={onLoadMore}>
    Load more
  </button>
);
