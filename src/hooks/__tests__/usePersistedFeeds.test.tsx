import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import usePersistedFeeds from '~/hooks/usePersistedFeeds';
import * as storage from '~/utils/storage';

jest.mock('~/utils/storage');

const mockFeed = {
  name: 'RSS Feed',
  url: 'https://rss.com/feed',
};
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePersistedFeeds', () => {
  const wrapper = createWrapper();
  beforeEach(() => {
    jest.clearAllMocks();
    (storage.loadFromStorage as jest.Mock).mockImplementation(() => [mockFeed]);
    (storage.saveToStorage as jest.Mock).mockImplementation(() => {});
  });

  it('should load feeds from storage on init', async () => {
    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.feeds).toEqual([mockFeed]);
    expect(storage.loadFromStorage).toHaveBeenCalledWith('savedFeeds', []);
  });

  it('should add a new feed', async () => {
    const newFeed = {
      name: 'New Feed',
      url: 'https://new-feed.com',
    };

    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    await act(async () => {
      result.current.addFeed(newFeed);
    });

    expect(storage.saveToStorage).toHaveBeenCalledWith('savedFeeds', [mockFeed, newFeed]);
  });

  it('should not add duplicate feeds', async () => {
    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    (storage.saveToStorage as jest.Mock).mockClear();

    await act(async () => {
      result.current.addFeed(mockFeed);
    });

    expect(storage.saveToStorage).not.toHaveBeenCalled();
  });

  it('should update a feed', async () => {
    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    await act(async () => {
      result.current.updateFeed(mockFeed.url, { name: 'Updated Feed' });
    });

    expect(storage.saveToStorage).toHaveBeenCalledWith('savedFeeds', [
      { ...mockFeed, name: 'Updated Feed' },
    ]);
  });

  it('should get a feed by URL', async () => {
    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const feed = result.current.getFeedByUrl(mockFeed.url);
    expect(feed).toEqual(mockFeed);
  });

  it('should return undefined for non-existent URL', async () => {
    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const feed = result.current.getFeedByUrl('non-existent-url');
    expect(feed).toBeUndefined();
  });

  it('should handle empty storage', async () => {
    (storage.loadFromStorage as jest.Mock).mockReturnValueOnce([]);
    const { result } = renderHook(() => usePersistedFeeds(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.feeds).toEqual([]);
  });
});
