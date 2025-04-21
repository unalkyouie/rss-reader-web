import { useState } from 'react';
import { Feed } from '~/types/global';
import { saveToStorage, loadFromStorage } from '~/utils/storage';

const FEEDS_KEY = 'savedFeeds';

const usePersistedFeeds = () => {
  const [feeds, setFeeds] = useState<Array<Feed>>(() => {
    return loadFromStorage(FEEDS_KEY, []) || [];
  });

  const persistFeeds = (updated: Array<Feed>) => {
    setFeeds(updated);
    saveToStorage(FEEDS_KEY, updated);
  };

  const addFeed = (feed: Feed) => {
    if (feeds.find((f) => f.url === feed.url)) return;
    const updated = [...feeds, feed];
    setFeeds(updated);
    saveToStorage(FEEDS_KEY, updated);
  };

  const removeFeed = (url: string) => {
    const updated = feeds.filter((feed) => feed.url !== url);
    persistFeeds(updated);
  };

  const updateFeed = (url: string, updates: Partial<Feed>) => {
    const updated = feeds.map((feed) => (feed.url === url ? { ...feed, ...updates } : feed));
    persistFeeds(updated);
  };

  const getFeedByUrl = (url: string) => {
    return feeds.find((feed) => feed.url === url);
  };

  return { feeds, addFeed, removeFeed, updateFeed, getFeedByUrl };
};

export default usePersistedFeeds;
