import React, {useEffect, useRef} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router';
import type {BreedImages} from 'cat-lover/types/breeds';
import type {Cat} from 'cat-lover/types/cats';
import {useFetch} from '../../hooks/useFetch';
import {BreedDetails} from '../breedDetails';
import {CatDetails} from '../catDetails';
import {Loader} from '../loader';
import styles from './styles.scss';

export const Modal = (): JSX.Element => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {id} = useParams<'id'>();

  const isInBreedView = pathname.includes('breeds');

  const {data, isFetching} = useFetch<BreedImages | Cat>(
    isInBreedView ? `images/search?breed_ids=${id as string}` : `images/${id as string}`
  );

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const handleClose = (): void => {
    (dialogRef.current as HTMLDialogElement).close();

    navigate(-1);
  };

  return (
    <dialog className={styles.dialog} ref={dialogRef} role="dialog">
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <div className={styles.container}>
            {isInBreedView ? <BreedDetails breedImages={data as BreedImages} /> : <CatDetails cat={data as Cat} />}
          </div>
          <div className={styles.actions}>
            <button onClick={handleClose}>Back</button>
          </div>
        </>
      )}
    </dialog>
  );
};
