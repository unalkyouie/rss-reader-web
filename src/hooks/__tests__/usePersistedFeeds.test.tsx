import { renderHook, act } from '@testing-library/react';
import { usePersistedFeeds } from '~/hooks/usePersistedFeeds';
import * as storageUtils from '~/utils/storage';
import { Feed } from '~/types/global';

describe('usePersistedFeeds', () => {
  const mockSaveToStorage = jest.spyOn(storageUtils, 'saveToStorage');
  const mockLoadFromStorage = jest.spyOn(storageUtils, 'loadFromStorage');

  const mockFeed: Feed = {
    url: 'https://rss.com/feed',
    name: 'RSS Feed',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads feeds from storage on init', () => {
    mockLoadFromStorage.mockReturnValue([mockFeed]);

    const { result } = renderHook(() => usePersistedFeeds());

    expect(result.current.feeds).toEqual([mockFeed]);
    expect(mockLoadFromStorage).toHaveBeenCalledWith('savedFeeds', []);
  });

  it('adds a feed and saves to storage', () => {
    mockLoadFromStorage.mockReturnValue([]);

    const { result } = renderHook(() => usePersistedFeeds());

    act(() => {
      result.current.addFeed(mockFeed);
    });

    expect(result.current.feeds).toEqual([mockFeed]);
    expect(mockSaveToStorage).toHaveBeenCalledWith('savedFeeds', [mockFeed]);
  });

  it('does not add duplicate feeds (by url)', () => {
    mockLoadFromStorage.mockReturnValue([mockFeed]);

    const { result } = renderHook(() => usePersistedFeeds());

    act(() => {
      result.current.addFeed(mockFeed);
    });

    expect(result.current.feeds).toEqual([mockFeed]);
    expect(mockSaveToStorage).toHaveBeenCalledTimes(1);
  });

  it('removes a feed and updates storage', () => {
    const feeds: Feed[] = [mockFeed, { url: 'https://remove.com/rss', name: 'To Remove' }];
    mockLoadFromStorage.mockReturnValue(feeds);

    const { result } = renderHook(() => usePersistedFeeds());

    act(() => {
      result.current.removeFeed('https://remove.com/rss');
    });

    expect(result.current.feeds).toEqual([mockFeed]);
    expect(mockSaveToStorage).toHaveBeenCalledWith('savedFeeds', [mockFeed]);
  });

  it('updates a feed by url', () => {
    const feeds: Feed[] = [mockFeed];
    mockLoadFromStorage.mockReturnValue(feeds);

    const { result } = renderHook(() => usePersistedFeeds());

    act(() => {
      result.current.updateFeed('https://rss.com/feed', {
        name: 'Updated Title',
      });
    });

    expect(result.current.feeds[0].name).toBe('Updated Title');

    expect(mockSaveToStorage).toHaveBeenCalledWith('savedFeeds', [
      { ...mockFeed, name: 'Updated Title' },
    ]);
  });
});
