import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'favoriteArticles';

const getStoredFavorites = (): Set<string> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return new Set(stored ? JSON.parse(stored) : []);
};

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(getStoredFavorites());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;
