import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeedSidebar from '~/features/feeds/FeedSidebar';
import { Feed } from '~/types/global';

jest.mock('~/hooks/usePersistedFeeds', () => {
  const mockFeeds: Feed[] = [
    { name: 'Feed One', url: 'https://one.com/rss' },
    { name: 'Feed Two', url: 'https://two.com/rss' },
  ];
  return {
    __esModule: true,
    default: () => ({
      feeds: mockFeeds,
      addFeed: jest.fn(),
      removeFeed: jest.fn(),
      updateFeed: jest.fn(),
      getFeedByUrl: jest.fn(),
    }),
  };
});

describe('FeedSidebar', () => {
  it('renders feeds and toggles unread filter', () => {
    const toggleUnread = jest.fn();
    render(
      <MemoryRouter>
        <FeedSidebar
          selectedFeed="https://one.com/rss"
          onSelectFeed={jest.fn()}
          showUnreadOnly={false}
          onToggleUnread={toggleUnread}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Your feeds')).toBeInTheDocument();
    expect(screen.getByText('Feed One')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /show unread/i }));
    expect(toggleUnread).toHaveBeenCalled();
  });

  it('renders "My Favorite Articles" as a virtual feed and triggers onSelectFeed', () => {
    const onSelectFeed = jest.fn();

    render(
      <MemoryRouter>
        <FeedSidebar
          selectedFeed=""
          onSelectFeed={onSelectFeed}
          showUnreadOnly={false}
          onToggleUnread={jest.fn()}
        />
      </MemoryRouter>,
    );

    const favoriteItem = screen.getByText(/my favorite articles/i);
    expect(favoriteItem).toBeInTheDocument();

    fireEvent.click(favoriteItem);
    expect(onSelectFeed).toHaveBeenCalledWith('__favorites__');
  });
});
