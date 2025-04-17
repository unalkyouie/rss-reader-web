import { useEffect, useState } from 'react';
import { FeedItem } from '@rowanmanning/feed-parser/lib/feed/item/base';
import { parseFeed } from '@rowanmanning/feed-parser';
import { ParsedArticle } from '~/types/global';

const useFeedArticles = (url: string) => {
  const [articles, setArticles] = useState<Array<ParsedArticle>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const xml = result.contents; // RSS XML is under 'contents'

        const feed = await parseFeed(xml);
        const mappedArticles: ParsedArticle[] = feed.items.map((item: FeedItem) => ({
          title: item.title || 'No title',
          link: item.url,
          pubDate: item.published,
          feedTitle: feed.title || 'No title',
          description: feed.description,
        }));

        setArticles(mappedArticles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch feed');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [url]);

  return { articles, loading, error };
};

export default useFeedArticles;
