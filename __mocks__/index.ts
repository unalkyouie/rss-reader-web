import { Article, Feed } from '~/types/global';

export const mockFeeds: Array<Feed> = [
  { name: 'Example Feed 1', url: 'https://example.com/rss1.xml' },
  { name: 'Example Feed 2', url: 'https://example.com/rss2.xml' },
];
export const mockArticles: Array<Article> = [
  {
    id: btoa('https://example.com/article-1').replace(/=+$/, '').replace(/\//g, '_'),
    title: 'First Article',
    link: 'https://example.com/article-1',
    description: 'Description for article 1',
    pubDate: new Date('2023-10-01'),
    feedTitle: 'Feed One',
    content: 'Content',
  },
  {
    id: btoa(`no-link-2`).replace(/=+$/, '').replace(/\//g, '_'),
    title: 'Second Article',
    link: null,
    description: 'Description for article 2',
    pubDate: new Date('2023-10-02'),
    feedTitle: 'Feed One',
    content: null,
  },
];
