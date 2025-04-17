import { useEffect, useState } from 'react';
import { Feed } from '~/types/global';
import { saveToStorage, loadFromStorage } from '~/utils/storage';

const FEEDS_KEY = 'savedFeeds';

export const usePersistedFeeds = () => {
  const [feeds, setFeeds] = useState<Feed[]>(() => loadFromStorage(FEEDS_KEY, []));

  useEffect(() => {
    saveToStorage(FEEDS_KEY, feeds);
  }, [feeds]);

  const addFeed = (feed: Feed) => {
    const exists = feeds.some((f) => f.url === feed.url);
    if (!exists) {
      setFeeds((prev) => [...prev, feed]);
    }
  };

  const removeFeed = (url: string) => {
    setFeeds((prev) => prev.filter((feed) => feed.url !== url));
  };

  const updateFeed = (url: string, updates: Partial<Feed>) => {
    setFeeds((prev) => prev.map((feed) => (feed.url === url ? { ...feed, ...updates } : feed)));
  };

  const getFeedByUrl = (url: string) => {
    return feeds.find((feed) => feed.url === url);
  };

  return { feeds, addFeed, removeFeed, updateFeed, getFeedByUrl };
};
