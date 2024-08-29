import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import type {BreedImages} from 'cat-lover/types/breeds';
import {BreedDetails} from './breedDetails';

describe('<BreedDetails />', () => {
  it('should render breed images', () => {
    const mockBreedImages: BreedImages = [
      {
        height: 200,
        id: '1',
        url: 'https://example.com/image1.jpg',
        width: 100
      },
      {
        height: 100,
        id: '2',
        url: 'https://example.com/image2.jpg',
        width: 200
      }
    ];

    const {container} = render(
      <MemoryRouter initialEntries={['/breeds/1']}>
        <BreedDetails breedImages={mockBreedImages} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
