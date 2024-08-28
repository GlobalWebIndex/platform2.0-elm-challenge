import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import type {CatList as CatListType} from 'cat-lover/types/cats';
import * as UseFetchCats from '../../hooks/useFetchCats';
import {CatList} from './catList';

const mockUseFetchCats = jest.fn<
  ReturnType<typeof UseFetchCats.useFetchCats>,
  Parameters<typeof UseFetchCats.useFetchCats>
>();
jest.mock<typeof UseFetchCats>('../../hooks/useFetchCats', () => ({
  useFetchCats: (...args) => mockUseFetchCats(...args)
}));

describe('<CatList />', () => {
  describe('when fetching', () => {
    beforeEach(() => {
      mockUseFetchCats.mockReturnValue({
        isFetching: true,
        isReFetching: false,
        list: [],
        reFetch: jest.fn()
      });
    });

    it('should render loader', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/cats']}>
          <CatList />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when fetching is complete', () => {
    const mockCats: CatListType = [
      {
        height: 0,
        id: '1',
        url: 'cat1.jpg',
        width: 0
      },
      {
        height: 0,
        id: '2',
        url: 'cat2.jpg',
        width: 0
      }
    ];

    beforeEach(() => {
      mockUseFetchCats.mockReturnValue({
        isFetching: false,
        isReFetching: false,
        list: mockCats,
        reFetch: jest.fn()
      });
    });

    it('should render a list of cats', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/cats']}>
          <CatList />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when the user clicks on the "Load more" button', () => {
    const reFetchMock = jest.fn();

    beforeEach(() => {
      mockUseFetchCats.mockReturnValue({
        isFetching: false,
        isReFetching: false,
        list: [],
        reFetch: reFetchMock
      });
    });

    it('should re-fetch a list of cats', async () => {
      render(
        <MemoryRouter initialEntries={['/cats']}>
          <CatList />
        </MemoryRouter>
      );
      const loadMoreButton = screen.getByRole('button', {name: 'Load more'});

      await userEvent.click(loadMoreButton);

      expect(reFetchMock).toHaveBeenCalledTimes(1);
      expect(reFetchMock).toHaveBeenCalledWith();
    });

    describe('while re-fetching', () => {
      beforeEach(() => {
        mockUseFetchCats.mockReturnValue({
          isFetching: false,
          isReFetching: true,
          list: [],
          reFetch: jest.fn()
        });
      });

      it('should disable the "Load more" button', () => {
        render(
          <MemoryRouter initialEntries={['/cats']}>
            <CatList />
          </MemoryRouter>
        );
        const loadMoreButton = screen.getByRole('button', {name: 'Load more'});

        expect(loadMoreButton).toBeDisabled();
      });
    });
  });
});
