import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import useFeedArticles from '~/hooks/useFeedArticles';

const validRss = `
  <rss version="2.0">
    <channel>
      <title>Test Feed</title>
      <description>Test Description</description>
      <item>
        <title>Article 1</title>
        <link>https://example.com/1</link>
        <pubDate>2023-01-01</pubDate>
      </item>
    </channel>
  </rss>
`;

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

describe('useFeedArticles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  const wrapper = createWrapper();

  it('should handle fetch errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFeedArticles('https://broken.url/feed'), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toMatch(/HTTP error! status: 404/);
  });

  it('should handle parse errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          contents: '<html><body><div></div></body></html>',
        }),
    });

    const { result } = renderHook(() => useFeedArticles('https://invalid.feed'), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeTruthy();
  });

  it('should handle missing items in feed gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          contents: '<rss><channel></channel></rss>',
        }),
    });

    const { result } = renderHook(() => useFeedArticles('https://empty.feed'), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.articles).toEqual([]);
  });

  it('should parse valid RSS feed correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          contents: validRss,
        }),
    });

    const { result } = renderHook(() => useFeedArticles('https://good.feed'), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.articles.length).toBe(1);
    expect(result.current.articles[0]).toEqual({
      id: btoa('https://example.com/1').replace(/=+$/, '').replace(/\//g, '_'),
      title: 'Article 1',
      link: 'https://example.com/1',
      pubDate: new Date('2023-01-01'),
      feedTitle: 'Test Feed',
      description: 'Test Description',
      content: null,
    });
  });

  it('should not fetch when url is empty', async () => {
    const { result } = renderHook(() => useFeedArticles(''), { wrapper });

    expect(result.current.loading).toBe(false);
    expect(result.current.articles).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });
});
