import { useEffect, useState } from 'react';
import RSSParser from 'rss-parser';

import { ArticlesList } from '~/types/global';

const useFeedArticles = (url: string) => {
  const [articles, setArticles] = useState<ArticlesList>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`Fetching articles from: ${url}`);
    let isMounted = true;
    const parser = new RSSParser();

    const fetchArticles = async () => {
      try {
        console.log('Starting RSS fetch...');
        const feed = await parser.parseURL(url);
        console.log('Feed fetched successfully:', feed.title);

        if (!isMounted) return;

        if (feed.items && Array.isArray(feed.items)) {
          const parsedArticles = feed.items.map(
            (item: { title?: string; link?: string; pubDate?: string; feedTitle?: string }) => ({
              title: item.title || 'Untitled',
              link: item.link || '',
              pubDate: item.pubDate || new Date().toISOString(),
              feedTitle: feed.title || 'Unknown Feed',
            }),
          );

          console.log(`Parsed ${parsedArticles.length} articles`);
          setArticles(parsedArticles);
        } else {
          console.warn('Feed items missing or not an array');
          setArticles([]);
        }
      } catch (error: unknown) {
        console.error('Error fetching feed:', error);
        if (isMounted) {
          setError(`Failed to load articles: error`);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          console.log('Feed loading completed');
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { error, loading, articles };
};

export default useFeedArticles;
