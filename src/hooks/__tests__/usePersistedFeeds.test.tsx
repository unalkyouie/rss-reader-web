import { renderHook, act } from '@testing-library/react';
import { usePersistedFeeds } from '~/hooks/usePersistedFeeds';
import * as storageUtils from '~/utils/storage';

describe('usePersistedFeeds', () => {
  const mockSaveToStorage = jest.spyOn(storageUtils, 'saveToStorage');
  const mockLoadFromStorage = jest.spyOn(storageUtils, 'loadFromStorage');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads feeds from storage on init', () => {
    mockLoadFromStorage.mockReturnValue(['https://rss.com/feed']);

    const { result } = renderHook(() => usePersistedFeeds());

    expect(result.current.feeds).toEqual(['https://rss.com/feed']);
    expect(mockLoadFromStorage).toHaveBeenCalledWith('savedFeeds', []);
  });

  it('adds a feed and saves to storage', () => {
    mockLoadFromStorage.mockReturnValue([]);

    const { result } = renderHook(() => usePersistedFeeds());

    act(() => {
      result.current.addFeed('https://example.com/rss');
    });

    expect(result.current.feeds).toEqual(['https://example.com/rss']);
    expect(mockSaveToStorage).toHaveBeenCalledWith('savedFeeds', ['https://example.com/rss']);
  });

  it('does not add duplicate feeds', () => {
    mockLoadFromStorage.mockReturnValue(['https://duplicate.com/rss']);

    const { result } = renderHook(() => usePersistedFeeds());

    act(() => {
      result.current.addFeed('https://duplicate.com/rss');
    });

    expect(result.current.feeds).toEqual(['https://duplicate.com/rss']);
    expect(mockSaveToStorage).toHaveBeenCalledTimes(1);
  });

  it('removes a feed and updates storage', () => {
    mockLoadFromStorage.mockReturnValue(['https://keep.com/rss', 'https://remove.com/rss']);

    const { result } = renderHook(() => usePersistedFeeds());

    act(() => {
      result.current.removeFeed('https://remove.com/rss');
    });

    expect(result.current.feeds).toEqual(['https://keep.com/rss']);
    expect(mockSaveToStorage).toHaveBeenCalledWith('savedFeeds', ['https://keep.com/rss']);
  });
});
