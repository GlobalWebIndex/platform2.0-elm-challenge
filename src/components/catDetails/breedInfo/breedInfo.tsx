import React from 'react';
import {Link} from 'react-router-dom';
import {type Cat} from 'cat-lover/types/cats';

type BreedInfoProps = {
  cat: Cat;
  className: string;
};

export const BreedInfo = ({cat, className}: BreedInfoProps): JSX.Element => (
  <div className={className}>
    <h2>Breeds</h2>
    <ul>
      {cat.breeds?.map(breed => (
        <li key={breed.id}>
          <h3>{breed.name}</h3>
          <ul>
            <li>
              <strong>Origin:</strong> {breed.origin}
            </li>
            <li>
              <strong>Temperament:</strong> {breed.temperament}
            </li>
            <li>
              <strong>Life span:</strong> {breed.life_span} years
            </li>
            <li>
              <strong>Wikipedia:</strong>{' '}
              <a href={breed.wikipedia_url} rel="noreferrer" target="_blank">
                {breed.wikipedia_url}
              </a>
            </li>
            <li>
              <Link to={`/breeds/${breed.id}`}>Visit the breed page</Link>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  </div>
);
