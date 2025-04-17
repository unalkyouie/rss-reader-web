import { useQuery } from '@tanstack/react-query';
import { parseFeed } from '@rowanmanning/feed-parser';
import { FeedItem } from '@rowanmanning/feed-parser/lib/feed/item/base';
import { ParsedArticle } from '~/types/global';

const fetchFeedArticles = async (url: string): Promise<ParsedArticle[]> => {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const result = await response.json();
  const xml = result.contents;
  const feed = await parseFeed(xml);

  return feed.items.map((item: FeedItem) => ({
    title: item.title || 'No title',
    link: item.url,
    pubDate: item.published,
    feedTitle: feed.title || 'No title',
    description: feed.description,
  }));
};

const useFeedArticles = (url: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['feedArticles', url],
    queryFn: () => fetchFeedArticles(url),
    enabled: !!url,
    staleTime: 1000 * 60 * 5,
  });

  return {
    articles: data || [],
    loading: isLoading,
    error: isError ? (error as Error).message : null,
  };
};

export default useFeedArticles;
