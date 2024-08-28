import React from 'react';
import {render} from '@testing-library/react';
import {Loader} from './loader';

describe('<Loader />', () => {
  it('should render loader', () => {
    const {container} = render(<Loader />);

    expect(container).toMatchSnapshot();
  });
});
