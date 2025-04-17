import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Feed } from '~/types/global';
import { loadFromStorage, saveToStorage } from '~/utils/storage';

const FEEDS_KEY = 'savedFeeds';

const loadFeeds = (): Feed[] => loadFromStorage(FEEDS_KEY, []);

const usePersistedFeeds = () => {
  const queryClient = useQueryClient();

  const { data: feeds = [] } = useQuery({
    queryKey: ['feeds'],
    queryFn: () => loadFeeds(),
    staleTime: Infinity,
  });

  const { mutate: addFeed } = useMutation({
    mutationFn: async (newFeed: Feed) => {
      const current = loadFeeds();
      const exists = current.some((f) => f.url === newFeed.url);
      const updated = exists ? current : [...current, newFeed];
      saveToStorage(FEEDS_KEY, updated);
      return Promise.resolve(updated);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['feeds'], data);
    },
  });

  const { mutate: removeFeed } = useMutation({
    mutationFn: async (url: string) => {
      const current = loadFeeds();
      const updated = current.filter((f) => f.url !== url);
      saveToStorage(FEEDS_KEY, updated);
      return Promise.resolve(updated);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['feeds'], data);
    },
  });

  const updateFeed = (url: string, updates: Partial<Feed>) => {
    const current = loadFeeds();
    const updated = current.map((feed) => (feed.url === url ? { ...feed, ...updates } : feed));
    saveToStorage(FEEDS_KEY, updated);
    queryClient.setQueryData(['feeds'], updated);
  };

  const getFeedByUrl = (url: string) => {
    return feeds.find((feed) => feed.url === url);
  };

  return {
    feeds,
    addFeed,
    removeFeed,
    updateFeed,
    getFeedByUrl,
  };
};

export default usePersistedFeeds;
