import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import {App} from './app';

jest.mock('./breedList', () => ({
  BreedList: () => {
    const {Outlet} = jest.requireActual('react-router');

    return (
      <div>
        Breed list
        <Outlet />
      </div>
    );
  }
}));

jest.mock('./catDetailsPreview', () => ({
  CatDetailsPreview: () => <div>Cat details preview</div>
}));

jest.mock('./catList', () => ({
  CatList: () => <div>Cat list</div>
}));

jest.mock('./modal', () => ({
  Modal: () => <div>Modal</div>
}));

describe('<App />', () => {
  it('should render the index route "cats"', () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  describe('when the route is "/cats"', () => {
    it('should render the cat list', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/cats']}>
          <App />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when the route is "/cats/:id"', () => {
    it('should render the cat details preview', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/cats/1']}>
          <App />
        </MemoryRouter>
      );
      expect(container).toMatchSnapshot();
    });

    describe('when a background location exists', () => {
      it('should render the modal', () => {
        const {container} = render(
          <MemoryRouter initialEntries={[{pathname: '/cats/1', state: {backgroundLocation: '/cats'}}]}>
            <App />
          </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('when the route is "/breeds"', () => {
    it('should render the breed list', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/breeds']}>
          <App />
        </MemoryRouter>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('when the route is "/breeds/:id"', () => {
    it('should render the modal', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/breeds/1']}>
          <App />
        </MemoryRouter>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('when the route is unknown', () => {
    it('should redirect to the "/cats" route', () => {
      const {container} = render(
        <MemoryRouter initialEntries={['/unknown']}>
          <App />
        </MemoryRouter>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
