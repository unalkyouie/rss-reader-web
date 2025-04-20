import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainView from '../MainView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as usePersistedFeedsHook from '~/hooks/usePersistedFeeds';
import { MemoryRouter } from 'react-router-dom';

const mockAddFeed = jest.fn();
const mockFeeds = [{ name: 'Test Feed', url: 'https://test.com/rss' }];

jest.mock('~/hooks/useFeedArticles', () => () => ({
  articles: [
    {
      id: '1',
      title: 'Article 1',
      url: 'https://example.com/article-1',
      description: 'Description',
      pubDate: new Date().toISOString(),
      feedTitle: 'Test Feed',
    },
  ],
  loading: false,
  error: null,
}));

jest.mock('~/hooks/usePersistedFeeds');

const mockUsePersistedFeeds = usePersistedFeedsHook as jest.Mocked<typeof usePersistedFeedsHook>;

beforeEach(() => {
  mockUsePersistedFeeds.default.mockReturnValue({
    feeds: mockFeeds,
    addFeed: mockAddFeed,
    removeFeed: jest.fn(),
    updateFeed: jest.fn(),
    getFeedByUrl: jest.fn(),
  });
});

describe('MainView', () => {
  const queryClient = new QueryClient();

  it('renders the main view with the feed list and articles', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MainView />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(screen.getByText('Your feeds')).toBeInTheDocument();
    expect(screen.getByText('Article 1')).toBeInTheDocument();
  });

  it('expands and collapses feed form', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MainView />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const toggleButton = screen.getByRole('button', { name: /add new feed/i });
    fireEvent.click(toggleButton);

    expect(screen.getByPlaceholderText(/techcrunch/i)).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByPlaceholderText(/techcrunch/i)).not.toBeInTheDocument();
  });

  it('adds a new feed and collapses the form', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MainView />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /add new feed/i }));

    fireEvent.change(screen.getByPlaceholderText(/techcrunch/i), {
      target: { value: 'New Feed' },
    });
    fireEvent.change(screen.getByPlaceholderText(/https:\/\/example\.com\/rss/i), {
      target: { value: 'https://newfeed.com/rss' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add feed/i }));

    await waitFor(() => {
      expect(mockAddFeed).toHaveBeenCalledWith({
        name: 'New Feed',
        url: 'https://newfeed.com/rss',
      });
    });

    expect(screen.queryByPlaceholderText(/techcrunch/i)).not.toBeInTheDocument();
  });
});
