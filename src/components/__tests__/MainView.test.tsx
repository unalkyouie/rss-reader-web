import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import usePersistedFeeds from '~/hooks/usePersistedFeeds';
import useFeedArticles from '~/hooks/useFeedArticles';
import MainView from '~/components/MainView';
import { MemoryRouter } from 'react-router-dom';

jest.mock('~/hooks/usePersistedFeeds');
jest.mock('~/hooks/useFeedArticles');

jest.mock('~/features/feeds/FeedForm', () => ({
  __esModule: true,
  default: ({ onAddFeed }: { onAddFeed: (feed: { name: string; url: string }) => void }) => {
    return (
      <button onClick={() => onAddFeed({ name: 'Test Feed', url: 'https://test.feed/rss' })}>
        Add Feed
      </button>
    );
  },
}));

describe('MainView', () => {
  beforeEach(() => {
    (usePersistedFeeds as jest.Mock).mockReturnValue({
      feeds: [{ name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml' }],
      addFeed: jest.fn(),
      removeFeed: jest.fn(),
    });

    (useFeedArticles as jest.Mock).mockReturnValue({
      articles: [{ title: 'Article 1', url: 'https://article1.com' }],
      loading: false,
      error: null,
    });
  });

  it('renders the main view with the feed list and articles', () => {
    render(
      <MemoryRouter>
        <MainView />
      </MemoryRouter>,
    );

    expect(screen.getByText('BBC News')).toBeInTheDocument();

    expect(screen.getByText('Article 1')).toBeInTheDocument();
  });

  it('selects a feed and updates the articles', async () => {
    render(
      <MemoryRouter>
        <MainView />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('BBC News'));

    await waitFor(() => {
      expect(useFeedArticles).toHaveBeenCalledWith('https://feeds.bbci.co.uk/news/rss.xml');
    });
  });

  it('adds a new feed and updates the feed list', () => {
    render(
      <MemoryRouter>
        <MainView />
      </MemoryRouter>,
    );

    const addFeedButton = screen.getByText('Add Feed');
    fireEvent.click(addFeedButton);

    expect(usePersistedFeeds().addFeed).toHaveBeenCalled();
  });

  it('displays loading state when articles are loading', () => {
    (useFeedArticles as jest.Mock).mockReturnValue({
      articles: [],
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <MainView />
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading articles...')).toBeInTheDocument();
  });

  it('displays error state when there is an error fetching articles', () => {
    (useFeedArticles as jest.Mock).mockReturnValue({
      articles: [],
      loading: false,
      error: 'Error loading articles',
    });

    render(
      <MemoryRouter>
        <MainView />
      </MemoryRouter>,
    );

    expect(screen.getByText('Error loading articles: Error loading articles')).toBeInTheDocument();
  });
});
