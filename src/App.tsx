import React, { useState, useEffect } from 'react';

import ArticlesList from '~/features/articles/ArticlesList';
import FeedList from '~/features/feeds/FeedList';
import { Feed } from '~/types/global';

const mockFeeds = [
  { id: 1, name: 'Example Title 1', url: 'url1' },
  { id: 2, name: 'Example Title 2', url: 'url2' },
];
const FEED_URL = 'https://feeds.bbci.co.uk/news/rss.xml';

const App: React.FC = () => {
  const [feeds, setFeeds] = useState<Array<Feed>>([]);

  useEffect(() => {
    console.log('App component mounted');
    setFeeds(mockFeeds);
  }, []);

  return (
    <div>
      <h1>RSS Reader</h1>
      <FeedList feeds={feeds} />
      <ArticlesList url={FEED_URL} />
    </div>
  );
};

export default App;
