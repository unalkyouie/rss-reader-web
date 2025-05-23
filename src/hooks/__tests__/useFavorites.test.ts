import { renderHook, act, waitFor } from '@testing-library/react';
import useFavorites from '~/hooks/useFavorites';
import { Article } from '~/types/global';

const STORAGE_KEY = 'favoriteArticles';

const testArticle: Article = {
  id: 'test-1',
  title: 'Test Article',
  description: 'This is a test',
  link: 'https://example.com',
  pubDate: new Date('2024-04-20'),
  feedTitle: '⭐ My Favorite Articles',
  content: null,
};

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites.length).toBe(0);
  });

  it('should add a favorite and persist it', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(testArticle);
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    expect(stored.map((a: Article) => a.id)).toContain(testArticle.id);
  });

  it.skip('should remove a favorite when toggled again', async () => {
    const { result, rerender } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(testArticle);
    });

    expect(result.current.favorites.find((a) => a.id === testArticle.id)).toBeDefined();

    act(() => {
      result.current.toggleFavorite(testArticle);
    });

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      expect(stored.map((a: Article) => a.id)).not.toContain(testArticle.id);
    });

    rerender();

    await waitFor(() => {
      expect(result.current.favorites.find((a) => a.id === testArticle.id)).toBeUndefined();
    });
  });

  it('should load favorites from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([testArticle]));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites.find((a) => a.id === testArticle.id)).toBeDefined();
  });
});
