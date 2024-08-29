import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import type {Cat} from 'cat-lover/types/cats';
import {CatDetails} from './catDetails';

describe('<CatDetails />', () => {
  describe('when the image width is less than or equal to its height', () => {
    it('should render with the horizontal layout', () => {
      const mockCat: Cat = {
        breeds: [],
        height: 500,
        id: '',
        url: 'https://example.com/cat.jpg',
        width: 400
      };

      const {container} = render(
        <MemoryRouter initialEntries={['/cats/1']}>
          <CatDetails cat={mockCat} />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });

    describe('when breeds are available', () => {
      it('should render breed information', () => {
        const mockCat: Cat = {
          breeds: [
            {
              country_code: '',
              country_codes: '',
              id: '1',
              life_span: '10-12',
              name: 'Breed 1',
              origin: 'Origin 1',
              temperament: 'Temperament 1',
              weight: {
                imperial: '',
                metric: ''
              },
              wikipedia_url: 'http://example.com/breed1'
            }
          ],
          height: 500,
          id: '',
          url: 'http://example.com/cat.jpg',
          width: 400
        };

        const {container} = render(
          <MemoryRouter initialEntries={['/cats/1']}>
            <CatDetails cat={mockCat} />
          </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('when the image width is greater than the height', () => {
    it('should render with the vertical layout', () => {
      const mockCat: Cat = {
        breeds: [],
        height: 400,
        id: '',
        url: 'http://example.com/cat.jpg',
        width: 500
      };

      const {container} = render(
        <MemoryRouter initialEntries={['/cats/1']}>
          <CatDetails cat={mockCat} />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });

    describe('when breeds are available', () => {
      it('should render breed information', () => {
        const mockCat: Cat = {
          breeds: [
            {
              country_code: '',
              country_codes: '',
              id: '1',
              life_span: '10-12',
              name: 'Breed 1',
              origin: 'Origin 1',
              temperament: 'Temperament 1',
              weight: {
                imperial: '',
                metric: ''
              },
              wikipedia_url: 'http://example.com/breed1'
            }
          ],
          height: 400,
          id: '',
          url: 'http://example.com/cat.jpg',
          width: 500
        };

        const {container} = render(
          <MemoryRouter initialEntries={['/cats/1']}>
            <CatDetails cat={mockCat} />
          </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
      });
    });
  });
});
