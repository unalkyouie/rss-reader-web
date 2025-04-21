import { useCallback, useEffect, useState } from 'react';
import { Article } from '~/types/global';

const STORAGE_KEY = 'favoriteArticles';

const getStoredFavorites = (): Article[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Article[]>(getStoredFavorites());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((article: Article) => {
    setFavorites((prev) => {
      const exists = prev.find((a) => a.id === article.id);
      if (exists) {
        return prev.filter((a) => a.id !== article.id);
      } else {
        return [...prev, article];
      }
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.some((a) => a.id === id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;
