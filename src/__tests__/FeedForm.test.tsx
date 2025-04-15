import { render, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import FeedForm from '../components/FeedForm';

describe('FeedForm', () => {
  it('calls onAddFeed with name and URL when form is submitted', async () => {
    const user = userEvent.setup();

    const onAddFeed = jest.fn();

    render(<FeedForm onAddFeed={onAddFeed} />);

    const nameInput = screen.getByPlaceholderText(/feed name/i);
    const urlInput = screen.getByPlaceholderText(/feed url/i);
    const button = screen.getByText(/add feed/i);

    await act(async () => {
      await user.type(nameInput, 'Changed Feed');

      await user.type(urlInput, 'url');

      await user.click(button);
    });

    expect(onAddFeed).toHaveBeenCalledWith({
      name: 'Changed Feed',
      url: 'url',
    });
    expect(onAddFeed).toHaveBeenCalledTimes(1);
  });
});
