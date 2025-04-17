import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import usePersistedFeeds from '~/hooks/usePersistedFeeds';
import * as storageUtils from '~/utils/storage';
import { Feed } from '~/types/global';

const queryClient = new QueryClient();

// Mock the necessary storage functions
jest.mock('~/utils/storage', () => ({
  loadFromStorage: jest.fn(),
  saveToStorage: jest.fn(),
}));

describe('usePersistedFeeds', () => {
  const mockFeed: Feed = {
    url: 'https://rss.com/feed',
    name: 'RSS Feed',
  };

  // Wrapper to provide QueryClient context
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load feeds from storage on init', async () => {
    // Mock loadFromStorage to return a mock feed
    (storageUtils.loadFromStorage as jest.Mock).mockReturnValueOnce([mockFeed]);

    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    // Check if the feeds are loaded correctly
    expect(result.current.feeds).toEqual([mockFeed]);
  });

  it('should add a feed and save it to storage', async () => {
    // Mock loadFromStorage to return an empty array
    (storageUtils.loadFromStorage as jest.Mock).mockReturnValueOnce([]);

    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    // Add a feed
    await act(async () => {
      result.current.addFeed(mockFeed);
    });

    // Assert that the feed was added and storage was updated
    expect(result.current.feeds).toEqual([mockFeed]);
    expect(storageUtils.saveToStorage).toHaveBeenCalledWith('savedFeeds', [mockFeed]);
  });

  it('should not add duplicate feeds', async () => {
    // Mock loadFromStorage to return an array with the mock feed
    (storageUtils.loadFromStorage as jest.Mock).mockReturnValueOnce([mockFeed]);

    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    // Try to add the same feed again
    await act(async () => {
      result.current.addFeed(mockFeed);
    });

    // Assert that the feed wasn't added again and the storage wasn't updated
    expect(result.current.feeds).toEqual([mockFeed]);
    expect(storageUtils.saveToStorage).toHaveBeenCalledTimes(1);
  });

  it('should remove a feed and update storage', async () => {
    const feeds: Feed[] = [mockFeed, { url: 'https://remove.com/feed', name: 'To Remove' }];
    // Mock loadFromStorage to return the feeds
    (storageUtils.loadFromStorage as jest.Mock).mockReturnValueOnce(feeds);

    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    // Remove a feed
    await act(async () => {
      result.current.removeFeed('https://remove.com/feed');
    });

    // Assert that the feed was removed and storage was updated
    expect(result.current.feeds).toEqual([mockFeed]);
    expect(storageUtils.saveToStorage).toHaveBeenCalledWith('savedFeeds', [mockFeed]);
  });

  it('should update a feed by url and save to storage', async () => {
    // Mock loadFromStorage to return the mock feed
    (storageUtils.loadFromStorage as jest.Mock).mockReturnValueOnce([mockFeed]);

    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    // Update the feed
    await act(async () => {
      result.current.updateFeed('https://rss.com/feed', { name: 'Updated Feed' });
    });

    // Assert that the feed was updated and storage was updated
    expect(result.current.feeds[0].name).toBe('Updated Feed');
    expect(storageUtils.saveToStorage).toHaveBeenCalledWith('savedFeeds', [
      { ...mockFeed, name: 'Updated Feed' },
    ]);
  });

  it('should return the feed by url', () => {
    // Mock loadFromStorage to return the mock feed
    (storageUtils.loadFromStorage as jest.Mock).mockReturnValueOnce([mockFeed]);

    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    // Get the feed by its URL
    const feed = result.current.getFeedByUrl('https://rss.com/feed');
    expect(feed).toEqual(mockFeed);
  });
});
