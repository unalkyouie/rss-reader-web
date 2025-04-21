import { useQuery } from '@tanstack/react-query';
import { parseFeed } from '@rowanmanning/feed-parser';
import { FeedItem } from '@rowanmanning/feed-parser/lib/feed/item/base';
import { Article } from '~/types/global';
import { sanitizeId } from '~/utils/sanitazeId';

const fetchFeedArticles = async (url: string): Promise<Article[]> => {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const xml = result.contents;

    try {
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
    } catch (error) {
      throw new Error(`Failed to parse the feed: ${error}`);
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error(`Failed to fetch feed articles: ${error}`);
  }
};

const useFeedArticles = (url: string) => {
  const { data, isLoading, isError, error } = useQuery<Article[]>({
    queryKey: ['feedArticles', url],
    queryFn: () => fetchFeedArticles(url),
    enabled: !!url && url !== '__favorites__',
    staleTime: 1000 * 60 * 5,
  });

  const articles = data ?? [];
  return {
    articles,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
  };
};

export default useFeedArticles;
