import { useQuery } from '@tanstack/react-query';
import { parseFeed } from '@rowanmanning/feed-parser';
import { FeedItem } from '@rowanmanning/feed-parser/lib/feed/item/base';
import { Article } from '~/types/global';

const sanitizeId = (input: string) => btoa(input).replace(/=+$/, '').replace(/\//g, '_');

const fetchFeedArticles = async (url: string): Promise<Article[]> => {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const result = await response.json();
  const xml = result.contents;
  const feed = await parseFeed(xml);

  return feed.items.map((item: FeedItem, index: number) => {
    const fallback = item.url || item.title || item.published || String(index);
    const id = sanitizeId(fallback.toString());

    return {
      id,
      title: item.title || 'No title',
      link: item.url,
      pubDate: item.published ? item.published : null,
      feedTitle: feed.title || 'No title',
      description: feed.description || null,
      content: item.content || null,
    };
  });
};

const useFeedArticles = (url: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['feedArticles', url],
    queryFn: () => fetchFeedArticles(url),
    enabled: !!url && url !== '__favorites__',
    staleTime: 1000 * 60 * 5,
  });

  return {
    articles: data || [],
    loading: isLoading,
    error: isError ? (error as Error).message : null,
  };
};

export default useFeedArticles;
