import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import type {BreedImages} from 'cat-lover/types/breeds';
import type {Cat} from 'cat-lover/types/cats';
import * as UseFetch from '../../hooks/useFetch';
import {Modal} from './modal';

type UseFetch = typeof UseFetch.useFetch<BreedImages | Cat>;
type UseFetchModule = Omit<typeof UseFetch, 'useFetch'> & {useFetch: UseFetch};

const mockUseFetch = jest.fn<ReturnType<UseFetch>, Parameters<UseFetch>>();
jest.mock<UseFetchModule>('../../hooks/useFetch', () => ({
  useFetch: (...args) => mockUseFetch(...args)
}));

describe('<Modal />', () => {
  const mockClose = jest.fn();
  const mockShowModal = jest.fn();

  beforeAll(() => {
    HTMLDialogElement.prototype.close = mockClose;
    HTMLDialogElement.prototype.showModal = mockShowModal;
  });

  beforeEach(() => {
    mockUseFetch.mockReturnValue({
      abort: jest.fn(),
      data: [],
      error: null,
      isFetching: false
    });
  });

  it('should open the dialog', () => {
    render(
      <MemoryRouter initialEntries={['/cats/1']}>
        <Modal />
      </MemoryRouter>
    );

    expect(mockShowModal).toHaveBeenCalledTimes(1);
  });

  describe('when data is fetching', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        abort: jest.fn(),
        data: null,
        error: null,
        isFetching: true
      });
    });

    it('should render Loader', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/cats/1']}>
          <Modal />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when data is fetched for cat', () => {
    beforeEach(() => {
      const mockCat = {
        breeds: [],
        height: 500,
        id: '',
        url: 'http://example.com/cat.jpg',
        width: 400
      };

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
          <Modal />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when data is fetched for breed', () => {
    beforeEach(() => {
      const mockBreedImages: BreedImages = [
        {
          height: 500,
          id: '1',
          url: 'http://example.com/cat.jpg',
          width: 400
        }
      ];

      mockUseFetch.mockReturnValue({
        abort: jest.fn(),
        data: mockBreedImages,
        error: null,
        isFetching: false
      });
    });

    it('should render breed details', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/breeds/1']}>
          <Modal />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when the user clicks on the "Back" button', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        abort: jest.fn(),
        data: [],
        error: null,
        isFetching: false
      });
    });

    it('should close the modal', async () => {
      render(
        <MemoryRouter initialEntries={['/cats/1']}>
          <Modal />
        </MemoryRouter>
      );

      await userEvent.click(screen.getByText('Back'));

      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
