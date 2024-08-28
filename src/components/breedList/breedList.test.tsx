import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import type {Breeds} from 'cat-lover/types/breeds';
import * as UseFetch from '../../hooks/useFetch';
import {BreedList} from './breedList';

type UseFetch = typeof UseFetch.useFetch<Breeds>;
type UseFetchModule = Omit<typeof UseFetch, 'useFetch'> & {useFetch: UseFetch};

const mockUseFetch = jest.fn<ReturnType<UseFetch>, Parameters<UseFetch>>();
jest.mock<UseFetchModule>('../../hooks/useFetch', () => ({
  useFetch: (...args) => mockUseFetch(...args)
}));

describe('<BreedList />', () => {
  beforeEach(() => {
    mockUseFetch.mockReturnValue({abort: jest.fn(), data: null, error: null, isFetching: true});
  });

  describe('when data is fetching', () => {
    it('should render Loader', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/breeds']}>
          <BreedList />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when data is fetched', () => {
    const breeds: Breeds = [
      {
        country_code: '',
        country_codes: '',
        id: '1',
        life_span: '',
        name: 'Breed 1',
        origin: '',
        temperament: '',
        weight: {
          imperial: '',
          metric: ''
        },
        wikipedia_url: ''
      },
      {
        country_code: '',
        country_codes: '',
        id: '2',
        life_span: '',
        name: 'Breed 2',
        origin: '',
        temperament: '',
        weight: {
          imperial: '',
          metric: ''
        },
        wikipedia_url: ''
      }
    ];

    beforeEach(() => {
      mockUseFetch.mockReturnValue({abort: jest.fn(), data: breeds, error: null, isFetching: false});
    });

    it('should render breeds', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/breeds']}>
          <BreedList />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
