import { ParsedArticle, Feed } from '~/types/global';

export const mockFeeds: Array<Feed> = [
  { name: 'Example Feed 1', url: 'https://example.com/rss1.xml' },
  { name: 'Example Feed 2', url: 'https://example.com/rss2.xml' },
];
export const mockArticles: ParsedArticle[] = [
  {
    title: 'First Article',
    link: 'https://example.com/article-1',
    description: 'Description for article 1',
    pubDate: new Date('2023-10-01'),
    feedTitle: 'Feed One',
  },
  {
    title: 'Second Article',
    link: null,
    description: 'Description for article 2',
    pubDate: new Date('2023-10-02'),
    feedTitle: 'Feed One',
  },
];
