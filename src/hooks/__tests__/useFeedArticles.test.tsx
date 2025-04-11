import {renderHook, act} from '@testing-library/react-hooks'

jest.mock('rss-parser', ()=>({
    RSSParser: jest.fn().mockImplementation(()=>({
        parseURL: jest.fn().mockResolvedValue({
            items: [
                {title: 'Article 1', link: 'http://example.com/1', pubDate: '2025-04-11'},
                {title: 'Article 2', link: 'http://example.com/2', pubDate: '2025-04-10'}
            ],
            title: 'Example Title'
        })
    }))
}));

describe('useFeedArticles', ()=>{
    it('should return articles when data is fetched', async() =>{

        const {result, waitForNextUpdate} = renderHook(()=>useFeedArticles('url'));

        await waitForNextUpdate();

        expect(result.current.articles).toEqual([
            {
                title: 'First Article',
                link: 'https://example.com/1',
                pubDate: '2025-04-10T12:00:00Z',
                feedTitle: 'Example Title 1'
            },
            {
                title: 'Second Article',
                link: 'https://example.com/2',
                pubDate: '2025-04-11T12:00:00Z',
                feedTitle: 'Example Title 2'
            }
        ]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });
    it('should return error when data fails to load', async() =>{

        jest.mock('rss-parser', ()=>({
            RSSParser: jest.fn().mockImplementation(()=>({
                parseURL: jest.fn().mockRejectedValue(new Error ('Network Error'));
            }))
        }));

        const {result, waitForNextUpdate} = renderHook(()=>useFeedArticles('url'));

        await waitForNextUpdate();

    
        expect(result.current.error).toBe('Failed to fetch articles');
        expect(result.current.loading).toBe(false);
    })
})