import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFeedArticles from '../useFeedArticles';

const mockFeed = {
  items: [
    { title: 'Article 1', link: 'http://example.com/1', pubDate: '2025-04-11' },
    { title: 'Article 2', link: 'http://example.com/2', pubDate: '2025-04-10' },
  ],
  title: 'Example Feed',
};

jest.mock('rss-parser', () => {
  return function () {
    return {
      parseURL: jest.fn().mockImplementation((url) => {
        if (url === 'http://example.com/error') {
          return Promise.reject(new Error('Network Error'));
        }
        return Promise.resolve(mockFeed);
      }),
    };
  };
});

describe('useFeedArticles hook', () => {
  it('should fetch and parse RSS feed articles', async () => {
    const { result } = renderHook(() => useFeedArticles('http://example.com/feed'));

    expect(result.current.loading).toBe(true);
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.articles).toHaveLength(2);
    expect(result.current.articles[0].title).toBe('Article 1');
    expect(result.current.articles[1].title).toBe('Article 2');
    expect(result.current.articles[0].feedTitle).toBe('Example Feed');
  });

  it('should handle errors when fetching fails', async () => {
    const { result } = renderHook(() => useFeedArticles('http://example.com/error'));

    expect(result.current.loading).toBe(true);
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toContain('Failed to load articles');
    expect(result.current.articles).toEqual([]);
  });
});
