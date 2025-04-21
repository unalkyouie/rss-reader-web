import React, { useEffect, useMemo, useState } from 'react';
import ArticlesGrid from '~/features/articles/ArticlesGrid';
import useFeedArticles from '~/hooks/useFeedArticles';
import usePersistedFeeds from '~/hooks/usePersistedFeeds';
import FeedSidebar from '~/features/feeds/FeedSidebar';
import useFavorites from '~/hooks/useFavorites';

const MainView = () => {
  const [selectedFeed, setSelectedFeed] = useState(
    () => localStorage.getItem('selectedFeedUrl') || '',
  );
  const { articles, error, loading } = useFeedArticles(selectedFeed);
  const { feeds } = usePersistedFeeds();

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const { favorites } = useFavorites();

  const readArticles = useMemo(() => {
    return new Set(JSON.parse(localStorage.getItem('readArticles') || '[]'));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedFeed === '__favorites__') {
      return showUnreadOnly ? favorites.filter((a) => !readArticles.has(a.id)) : favorites;
    }
    if (showUnreadOnly) return articles.filter((a) => !readArticles.has(a.id));
    return articles;
  }, [selectedFeed, articles, favorites, showUnreadOnly, readArticles]);

  const toggleShowUnread = () => {
    setShowUnreadOnly((prev) => !prev);
  };

  const handleSelectFeed = (url: string) => {
    setSelectedFeed(url);
    localStorage.setItem('selectedFeedUrl', url);
  };

  useEffect(() => {
    const isFavorites = selectedFeed === '__favorites__';
    const isValidFeed = feeds.some((f) => f.url === selectedFeed);

    if (!isFavorites && (!selectedFeed || !isValidFeed) && feeds.length > 0) {
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
          {loading && <div>Loading articles...</div>}
          {error && <div className="error">Error loading articles: {error}</div>}
          {!loading && !error && <ArticlesGrid articles={filteredArticles} />}
        </main>
      </div>
    </div>
  );
};

export default MainView;
