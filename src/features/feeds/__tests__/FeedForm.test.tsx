import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import FeedForm from '~/features/feeds/FeedForm';

describe('FeedForm', () => {
  it('calls onAddFeed with name and URL when form is submitted', async () => {
    const user = userEvent.setup();

    const onAddFeed = jest.fn();

    render(<FeedForm onAddFeed={onAddFeed} />);

    const nameInput = screen.getByPlaceholderText(/feed name/i);
    const urlInput = screen.getByPlaceholderText(/feed url/i);
    const button = screen.getByRole('button', { name: /add feed/i });

    await user.type(nameInput, 'Changed Feed');
    await user.type(urlInput, 'https://example.com/feed');

    await user.click(button);

    expect(onAddFeed).toHaveBeenCalledWith({
      name: 'Changed Feed',
      url: 'https://example.com/feed',
    });
    expect(onAddFeed).toHaveBeenCalledTimes(1);
  });
});
