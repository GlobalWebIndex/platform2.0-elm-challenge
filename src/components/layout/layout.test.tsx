import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import {Layout} from './layout';

describe('<Layout />', () => {
  it('should render navigation links', () => {
    const {container} = render(<Layout />, {wrapper: MemoryRouter});

    expect(container).toMatchSnapshot();
  });
});
