import { renderHook, act } from '@testing-library/react';
import useFavorites from '../useFavorites';

const STORAGE_KEY = 'favoriteArticles';
const testId = 'test-article-1';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites.has(testId)).toBe(false);
  });

  it('should add a favorite and persist it', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(testId);
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    expect(stored).toContain(testId);
  });

  it('should remove a favorite when toggled again', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(testId);
    });

    act(() => {
      result.current.toggleFavorite(testId);
    });

    expect(result.current.favorites.has(testId)).toBe(false);

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    expect(stored).not.toContain(testId);
  });

  it('should load favorites from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([testId]));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites.has(testId)).toBe(true);
  });
});
