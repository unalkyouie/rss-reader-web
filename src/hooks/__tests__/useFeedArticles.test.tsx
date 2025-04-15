import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFeedArticles from '../useFeedArticles';

// Sample mock data
const mockFeed = {
    items: [
        {title: 'Article 1', link: 'http://example.com/1', pubDate: '2025-04-11'},
        {title: 'Article 2', link: 'http://example.com/2', pubDate: '2025-04-10'}
    ],
    title: 'Example Feed'
};

// Creating a mock module for rss-parser
jest.mock('rss-parser', () => {
    // Create a mock parser constructor with a parseURL method
    return function() {
        return {
            parseURL: jest.fn().mockImplementation((url) => {
                if (url === 'http://example.com/error') {
                    return Promise.reject(new Error('Network Error'));
                }
                return Promise.resolve(mockFeed);
            })
        };
    };
});

describe('useFeedArticles hook', () => {
    it('should fetch and parse RSS feed articles', async () => {
        // Render the hook with a valid URL
        const { result } = renderHook(() => 
            useFeedArticles('http://example.com/feed')
        );

        // Initial state should be loading
        expect(result.current.loading).toBe(true);
        expect(result.current.articles).toEqual([]);
        expect(result.current.error).toBeNull();

        // Wait for the data to load
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // After loading, should have articles
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.articles).toHaveLength(2);
        expect(result.current.articles[0].title).toBe('Article 1');
        expect(result.current.articles[1].title).toBe('Article 2');
        expect(result.current.articles[0].feedTitle).toBe('Example Feed');
    });

    it('should handle errors when fetching fails', async () => {
        // Render the hook with an URL that will trigger an error
        const { result } = renderHook(() => 
            useFeedArticles('http://example.com/error')
        );

        // Initial state should be loading
        expect(result.current.loading).toBe(true);
        expect(result.current.articles).toEqual([]);
        expect(result.current.error).toBeNull();

        // Wait for the error to be processed
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // After error, loading should be false and error should be set
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toContain('Failed to load articles');
        expect(result.current.articles).toEqual([]);
    });
});