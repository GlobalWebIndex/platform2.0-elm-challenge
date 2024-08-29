import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import type {Cat} from 'cat-lover/types/cats';
import * as UseFetch from '../../hooks/useFetch';
import {CatDetailsPreview} from './catDetailsPreview';

type UseFetch = typeof UseFetch.useFetch<Cat>;
type UseFetchModule = Omit<typeof UseFetch, 'useFetch'> & {useFetch: UseFetch};

const mockUseFetch = jest.fn<ReturnType<UseFetch>, Parameters<UseFetch>>();
jest.mock<UseFetchModule>('../../hooks/useFetch', () => ({
  useFetch: (...args) => mockUseFetch(...args)
}));

describe('<CatDetailsPreview />', () => {
  describe('when data is fetching', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        abort: jest.fn(),
        data: null,
        error: null,
        isFetching: true
      });
    });

    it('should render loader', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/cats/1']}>
          <CatDetailsPreview />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when data is fetched', () => {
    const mockCat: Cat = {
      breeds: [],
      height: 500,
      id: '1',
      url: 'http://example.com/cat.jpg',
      width: 400
    };

    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        abort: jest.fn(),
        data: mockCat,
        error: null,
        isFetching: false
      });
    });

    it('should render cat details', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/cats/1']}>
          <CatDetailsPreview />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
