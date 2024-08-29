import React from 'react';
import {useParams} from 'react-router';
import type {Cat} from 'cat-lover/types/cats';
import {useFetch} from '../../hooks/useFetch';
import {CatDetails} from '../catDetails';
import {Loader} from '../loader';

export const CatDetailsPreview = (): JSX.Element => {
  const {id} = useParams<'id'>();

  const {data, isFetching} = useFetch<Cat>(`images/${id as string}`);

  if (isFetching) {
    return <Loader />;
  }

  return <CatDetails cat={data as Cat} />;
};
