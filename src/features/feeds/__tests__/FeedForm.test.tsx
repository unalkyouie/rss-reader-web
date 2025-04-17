// src/features/feeds/__tests__/FeedForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedForm from '../FeedForm';

describe('FeedForm', () => {
  it('calls onAddFeed with name and URL when form is submitted', async () => {
    const onAddFeed = jest.fn();
    render(<FeedForm onAddFeed={onAddFeed} />);

    const nameInput = screen.getByPlaceholderText('e.g. TechCrunch');
    const urlInput = screen.getByPlaceholderText('https://example.com/rss');
    const button = screen.getByRole('button', { name: /add feed/i });

    await userEvent.type(nameInput, 'New Feed');
    await userEvent.type(urlInput, 'https://new-feed.com/rss');
    await userEvent.click(button);

    expect(onAddFeed).toHaveBeenCalledWith({
      name: 'New Feed',
      url: 'https://new-feed.com/rss',
    });
  });
});
