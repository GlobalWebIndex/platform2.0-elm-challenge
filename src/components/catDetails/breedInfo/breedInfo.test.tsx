import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import type {Cat} from 'cat-lover/types/cats';
import {BreedInfo} from './breedInfo';

describe('<BreedInfo />', () => {
  const mockCat: Cat = {
    breeds: [
      {
        country_code: '',
        country_codes: '',
        id: '1',
        life_span: '10-12',
        name: 'Breed One',
        origin: 'Country One',
        temperament: 'Calm',
        weight: {
          imperial: '',
          metric: ''
        },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Breed_One'
      }
    ],
    height: 100,
    id: '1',
    url: 'https://example.com/cat.jpg',
    width: 200
  };
  const props = {
    cat: mockCat,
    className: 'testClass'
  };

  it('should render breed information', () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/cats/1']}>
        <BreedInfo {...props} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  describe('when the cat has multiple breeds', () => {
    const multipleBreedsCat: Cat = {
      ...mockCat,
      breeds: [
        ...(mockCat.breeds as NonNullable<Cat['breeds']>),
        {
          country_code: '',
          country_codes: '',
          id: '2',
          life_span: '12-14',
          name: 'Breed Two',
          origin: 'Country Two',
          temperament: 'Active',
          weight: {
            imperial: '',
            metric: ''
          },
          wikipedia_url: 'https://en.wikipedia.org/wiki/Breed_Two'
        }
      ]
    };
    const multipleBreedsProps = {
      ...props,
      cat: multipleBreedsCat
    };

    it('should render with multiple breeds', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/cats/1']}>
          <BreedInfo {...multipleBreedsProps} />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('should render link that navigates tp the "breed details" screen', () => {
    const {getByText} = render(
      <MemoryRouter initialEntries={['/cats/1']}>
        <BreedInfo {...props} />
      </MemoryRouter>
    );
    const moreDetailsLink = getByText('Visit the breed page');

    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', '/breeds/1');
  });
});
