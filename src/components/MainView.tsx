import React, { useEffect, useMemo, useState, useCallback } from 'react';
import ArticlesGrid from '~/features/articles/ArticlesGrid';
import useFeedArticles from '~/hooks/useFeedArticles';
import usePersistedFeeds from '~/hooks/usePersistedFeeds';
import FeedSidebar from '~/features/feeds/FeedSidebar';
import useFavorites from '~/hooks/useFavorites';

const MainView = () => {
  const [selectedFeed, setSelectedFeed] = useState(
    () => localStorage.getItem('selectedFeedUrl') || ''
  );
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const isFavoritesFeed = selectedFeed === '__favorites__';
  const { feeds } = usePersistedFeeds();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { articles, error, loading } = useFeedArticles(isFavoritesFeed ? '' : selectedFeed);

  const readArticles = useMemo(() => {
    return new Set(JSON.parse(localStorage.getItem('readArticles') || '[]'));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const source = isFavoritesFeed ? favorites : articles;
    if (showUnreadOnly) {
      return source.filter((a) => !readArticles.has(a.id));
    }
    return source;
  }, [selectedFeed, articles, favorites, showUnreadOnly, readArticles]);

  const toggleShowUnread = () => {
    setShowUnreadOnly((prev) => !prev);
  };

  const handleSelectFeed = (url: string) => {
    setSelectedFeed(url);
    localStorage.setItem('selectedFeedUrl', url);
  };

  useEffect(() => {
    const isValidFeed = feeds.some((f) => f.url === selectedFeed);
    if (!isFavoritesFeed && (!selectedFeed || !isValidFeed) && feeds.length > 0) {
      const defaultFeed = feeds[0].url;
      setSelectedFeed(defaultFeed);
      localStorage.setItem('selectedFeedUrl', defaultFeed);
    }
  }, [feeds, selectedFeed]);

  return (
    <div className="main-feed-page">
      <div className="layout">
        <FeedSidebar
          selectedFeed={selectedFeed}
          onSelectFeed={handleSelectFeed}
          showUnreadOnly={showUnreadOnly}
          onToggleUnread={toggleShowUnread}
        />
        <main className="main-content">
          {!isFavoritesFeed && loading && (
            <div className="loader-wrapper">
              <div className="loader" />
            </div>
          )}
          {!isFavoritesFeed && error && (
            <div className="error">Error loading articles: {error}</div>
          )}
          <ArticlesGrid articles={filteredArticles} />
        </main>
      </div>
    </div>
  );
};

export default MainView;
