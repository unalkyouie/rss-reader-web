import { renderHook } from '@testing-library/react';
import useFeedArticles from '../useFeedArticles';

const mockFeed = {
    items: [
        {title: 'Article 1', link: 'http://example.com/1', pubDate: '2025-04-11'},
        {title: 'Article 2', link: 'http://example.com/2', pubDate: '2025-04-10'}
    ],
    title: 'Example Feed'
};

const mockParseURL = jest.fn();
jest.mock('rss-parser', () => {
    return {
        default: jest.fn().mockImplementation(() => ({
            parseURL: mockParseURL
        }))
    };
});

describe('useFeedArticles', () => {
    beforeEach(() => {
        mockParseURL.mockClear();
    });

    it('should return articles when data is fetched', async () => {
        mockParseURL.mockResolvedValueOnce(mockFeed);
        
        const { result, rerender } = renderHook(() => useFeedArticles('http://example.com/feed'));
        
        // Initial state
        expect(result.current.loading).toBe(true);
        expect(result.current.articles).toEqual([]);
        
        // Wait for next tick to allow state updates
        await Promise.resolve();
        rerender();

        expect(result.current.articles).toEqual([
            {
                title: 'Article 1',
                link: 'http://example.com/1',
                pubDate: '2025-04-11',
                feedTitle: 'Example Feed'
            },
            {
                title: 'Article 2',
                link: 'http://example.com/2',
                pubDate: '2025-04-10',
                feedTitle: 'Example Feed'
            }
        ]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should return error when data fails to load', async () => {
        mockParseURL.mockRejectedValueOnce(new Error('Network Error'));
        
        const { result, rerender } = renderHook(() => useFeedArticles('http://example.com/feed'));
        
        // Initial state
        expect(result.current.loading).toBe(true);
        expect(result.current.articles).toEqual([]);
        
        // Wait for next tick to allow state updates
        await Promise.resolve();
        rerender();

        expect(result.current.error).toBe('Failed to load articles');
        expect(result.current.loading).toBe(false);
        expect(result.current.articles).toEqual([]);
    });
});