import { ArticlesList, FeedList } from "../../types"

export const mockFeeds: FeedList =[
    {id:1, name: 'Example Title 1', url: 'url1'},
    {id:2, name: 'Example Title 2', url: 'url2'}
]

export const mockArticles: ArticlesList =[
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
]