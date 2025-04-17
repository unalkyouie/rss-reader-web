import React, { useState } from 'react';
import FeedList from '~/features/feeds/FeedList';
import FeedForm from '~/features/feeds/FeedForm';
import ArticlesGrid from '~/features/articles/ArticlesGrid';
import { Feed } from '~/types/global';
import '~/styles/main.css';
import useFeedArticles from '~/hooks/useFeedArticles';

const FEED_URL = 'https://feeds.bbci.co.uk/news/rss.xml';

const App: React.FC = () => {
  const [feeds, setFeeds] = useState<Feed[]>([{ id: 1, name: 'BBC News', url: FEED_URL }]);
  const [selectedFeed, setSelectedFeed] = useState<string | null>(FEED_URL);

  const { articles, error, loading } = useFeedArticles(selectedFeed || '');

  const handleAddFeed = (newFeed: { name: string; url: string }) => {
    const nextId = feeds.length ? Math.max(...feeds.map((f) => f.id)) + 1 : 1;
    setFeeds([...feeds, { ...newFeed, id: nextId }]);
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
