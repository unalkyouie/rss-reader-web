import React, { useState } from 'react';
import FeedList from '~/features/feeds/FeedList';
import FeedForm from '~/features/feeds/FeedForm';
import ArticlesGrid from '~/features/articles/ArticlesGrid';
import useFeedArticles from '~/hooks/useFeedArticles';
import usePersistedFeeds from '~/hooks/usePersistedFeeds';

const MainView: React.FC = () => {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);

  const { articles, error, loading } = useFeedArticles(selectedFeed || '');
  const { feeds, addFeed } = usePersistedFeeds();

  const handleAddFeed = (newFeed: { name: string; url: string }) => {
    addFeed(newFeed);
  };

  const handleSelectFeed = (url: string) => {
    setSelectedFeed(url);
  };

  return (
    <div className="main-feed-page">
      <div className="layout">
        <aside className="sidebar">
          <FeedForm onAddFeed={handleAddFeed} />
          <FeedList
            feeds={feeds}
            onSelectFeed={handleSelectFeed}
            selectedFeedUrl={selectedFeed ?? undefined}
          />
        </aside>
        <main className="main-content">
          {loading && <div>Loading articles...</div>}
          {error && <div className="error">Error loading articles: {error}</div>}
          {!loading && !error && <ArticlesGrid articles={articles} />}
        </main>
      </div>
    </div>
  );
};

export default MainView;
