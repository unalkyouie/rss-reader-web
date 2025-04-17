import React, { useState } from 'react';
import FeedList from '~/features/feeds/FeedList';
import FeedForm from '~/features/feeds/FeedForm';
import ArticlesGrid from '~/features/articles/ArticlesGrid';
import '~/styles/main.css';
import useFeedArticles from '~/hooks/useFeedArticles';
import { usePersistedFeeds } from '~/hooks/usePersistedFeeds';

const FEED_URL = 'https://feeds.bbci.co.uk/news/rss.xml';

const App: React.FC = () => {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(FEED_URL);

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
      <aside className="sidebar">
        <FeedForm onAddFeed={handleAddFeed} />
        <FeedList
          feeds={feeds}
          onSelectFeed={handleSelectFeed}
          selectedFeedUrl={selectedFeed ?? undefined}
        />
      </aside>
      <main className="content">
        {loading && <div>Loading articles...</div>}
        {error && <div className="error">Error loading articles: {error}</div>}
        {!loading && !error && <ArticlesGrid articles={articles} />}
      </main>
    </div>
  );
};

export default App;
