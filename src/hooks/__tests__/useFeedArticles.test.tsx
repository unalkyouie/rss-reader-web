import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFeedArticles from '~/hooks/useFeedArticles';

jest.mock('@rowanmanning/feed-parser', () => ({
  parseFeed: jest.fn(),
}));

import { parseFeed } from '@rowanmanning/feed-parser';

const mockFeed = {
  items: [
    { title: 'Article 1', url: 'http://example.com/1', published: '2025-04-11' },
    { title: 'Article 2', url: 'http://example.com/2', published: '2025-04-10' },
  ],
  title: 'Example Feed',
  description: 'An example feed description',
};

describe('useFeedArticles hook', () => {
  const originalFetch = window.fetch;
  let mockFetch: jest.Mock;

  beforeAll(() => {
    mockFetch = jest.fn();
    window.fetch = mockFetch;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ contents: 'mock-xml' }), // Ensure json() returns the expected structure
    });
    (parseFeed as jest.Mock).mockResolvedValue(mockFeed);
  });

  afterAll(() => {
    window.fetch = originalFetch;
  });

  it('should fetch and parse RSS feed articles', async () => {
    const { result } = renderHook(() => useFeedArticles('http://example.com/feed'));

    // Ensure initial state is correct
    expect(result.current.loading).toBe(true);
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for hook to complete the fetch and parsing
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify the fetch and parsing process
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.allorigins.win/get?url=http%3A%2F%2Fexample.com%2Ffeed',
    ); // Check URL with proxy

    // Validate final result
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.articles).toHaveLength(2);
    expect(result.current.articles[0].title).toBe('Article 1');
    expect(result.current.articles[1].title).toBe('Article 2');
    expect(result.current.articles[0].feedTitle).toBe('Example Feed');
  });

  it('should handle fetch errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ contents: 'Not found' }), // Ensure proper mock response format
    });

    const { result } = renderHook(() => useFeedArticles('http://example.com/error'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toMatch(/HTTP error! status: 404/);
    expect(result.current.articles).toEqual([]);
  });

  it('should handle parse errors', async () => {
    (parseFeed as jest.Mock).mockRejectedValueOnce(new Error('Parse error'));

    const { result } = renderHook(() => useFeedArticles('http://example.com/feed'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Parse error');
    expect(result.current.articles).toEqual([]);
  });
});
