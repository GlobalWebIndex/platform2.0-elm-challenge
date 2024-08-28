import React from 'react';
import {render} from '@testing-library/react';
import {Cat} from './cat';

describe('<Cat />', () => {
  it('should render the cat image', () => {
    const {container} = render(<Cat url="https://example.com/cat.jpg" />);

    expect(container).toMatchSnapshot();
  });
});
