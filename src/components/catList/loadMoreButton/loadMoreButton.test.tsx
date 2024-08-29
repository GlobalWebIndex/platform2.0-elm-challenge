import React from 'react';
import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import {LoadMoreButton} from './loadMoreButton';

describe('<LoadMoreButton />', () => {
  const props = {isDisabled: false, onLoadMore: jest.fn()};

  it('should render the button', () => {
    const {container} = render(<LoadMoreButton {...props} />);

    expect(container).toMatchSnapshot();
  });

  describe('when passed `isDisabled`', () => {
    const propsDisabled = {...props, isDisabled: true};

    it('should render the button as "disabled"', () => {
      render(<LoadMoreButton {...propsDisabled} />);

      expect(screen.getByText('Load more')).toBeDisabled();
    });

    describe('when the button is clicked', () => {
      it('should not fire `onLoadMore` from props', async () => {
        render(<LoadMoreButton {...propsDisabled} />);

        await userEvent.click(screen.getByText('Load more'));

        expect(propsDisabled.onLoadMore).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the button is clicked', () => {
    it('should fire `onLoadMore` from props', async () => {
      render(<LoadMoreButton {...props} />);

      await userEvent.click(screen.getByText('Load more'));

      expect(props.onLoadMore).toHaveBeenCalledTimes(1);
      expect(props.onLoadMore).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
