import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeedSidebar from '~/features/feeds/FeedSidebar';
import { Feed } from '~/types/global';

jest.mock('~/hooks/usePersistedFeeds', () => ({
  __esModule: true,
  default: () => ({
    feeds: [
      { name: 'Feed One', url: 'https://example.com/rss' },
      { name: 'Feed Two', url: 'https://example.org/rss' },
    ],
    addFeed: jest.fn(),
    removeFeed: jest.fn(),
    updateFeed: jest.fn(),
    getFeedByUrl: jest.fn(),
  }),
}));
const mockFeeds: Array<Feed> = [
  { name: 'Feed One', url: 'https://example.com/rss' },
  { name: 'Feed Two', url: 'https://example.org/rss' },
];

describe('FeedSidebar', () => {
  it('renders the list of feeds', () => {
    render(
      <MemoryRouter>
        <FeedSidebar
          selectedFeed={mockFeeds[0].url}
          onSelectFeed={jest.fn()}
          showUnreadOnly={false}
          onToggleUnread={jest.fn()}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Your feeds')).toBeInTheDocument();
    mockFeeds.forEach((feed) => {
      expect(screen.getByText(feed.name)).toBeInTheDocument();
    });
  });

  it('calls onToggleUnread when the toggle button is clicked', () => {
    const toggleFn = jest.fn();
    render(
      <MemoryRouter>
        <FeedSidebar
          selectedFeed={mockFeeds[0].url}
          onSelectFeed={jest.fn()}
          showUnreadOnly={true}
          onToggleUnread={toggleFn}
        />
      </MemoryRouter>,
    );
    const toggleButton = screen.getByRole('button', { name: /show all/i });
    fireEvent.click(toggleButton);

    expect(toggleFn).toHaveBeenCalled();
  });
});
