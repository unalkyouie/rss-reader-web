import { useSyncExternalStore } from 'react';
import { Article } from '~/types/global';
import { loadFromStorage, saveToStorage } from '~/utils/storage';

const STORAGE_KEY = 'favoriteArticles';

let listeners: Array<() => void> = [];
let favorites: Article[] = loadFromStorage(STORAGE_KEY, []);

const emitChange = () => {
  for (const listener of listeners) listener();
};

const subscribe = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const getSnapshot = () => favorites;

const toggleFavorite = (article: Article) => {
  const exists = favorites.some((a) => a.id === article.id);
  favorites = exists
    ? favorites.filter((a) => a.id !== article.id)
    : [...favorites, article];

  saveToStorage(STORAGE_KEY, favorites);
  emitChange();
};

const useFavorites = () => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

  const isFavorite = (id: string) => snapshot.some((a) => a.id === id);

  return {
    favorites: snapshot,
    toggleFavorite,
    isFavorite,
  };
};

export default useFavorites;
