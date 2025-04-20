import { render, screen, fireEvent } from '@testing-library/react';
import FeedList from '~/features/feeds/FeedList';

jest.mock('~/hooks/usePersistedFeeds', () => ({
  __esModule: true,
  default: () => ({
    feeds: [
      { name: 'Feed One', url: 'https://example.com/rss' },
      { name: 'Feed Two', url: 'https://example.org/rss' },
    ],
    removeFeed: jest.fn(),
    updateFeed: jest.fn(),
  }),
}));

describe('FeedList', () => {
  it('shows edit form when clicking edit and cancels edit', () => {
    render(<FeedList selectedFeed="https://example.com/rss" onSelectFeed={jest.fn()} />);

    const editBtn = screen.getAllByLabelText(/edit feed/i)[0];
    fireEvent.click(editBtn);

    expect(screen.getByDisplayValue('Feed One')).toBeInTheDocument();

    const cancelBtn = screen.getByLabelText(/cancel edit/i);
    fireEvent.click(cancelBtn);

    expect(screen.queryByDisplayValue('Feed One')).not.toBeInTheDocument();
  });

  it('asks for confirmation on delete', () => {
    window.confirm = jest.fn(() => true);

    render(<FeedList selectedFeed="https://example.com/rss" onSelectFeed={jest.fn()} />);

    const deleteBtn = screen.getAllByLabelText(/delete feed/i)[0];
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalled();
  });
});
