import React from 'react';
import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';
import {useFetchCats} from '../../hooks/useFetchCats';
import {Loader} from '../loader';
import {Cat} from './cat';
import {LoadMoreButton} from './loadMoreButton';
import styles from './styles.scss';

export const CatList = (): JSX.Element => {
  const location = useLocation();
  const {isFetching, isReFetching, reFetch, list} = useFetchCats();

  const handleLoadMore = (): void => {
    void reFetch();
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cats}>
        {list.map((cat, index) => (
          <Link key={index} state={{backgroundLocation: location}} to={cat.id}>
            <Cat url={cat.url} />
          </Link>
        ))}
      </div>
      <div className={styles.loadMore}>
        <LoadMoreButton isDisabled={isReFetching} onLoadMore={handleLoadMore} />
      </div>
    </div>
  );
};
