import React, { useState, useEffect } from 'react';

import ArticlesList from '~/features/articles/ArticlesList';
import FeedForm from '~/features/feeds/FeedForm';
import FeedList from '~/features/feeds/FeedList';
import { Feed } from '~/types/global';

export const mockFeeds = [
  { id: 1, name: 'Example Title 1', url: 'url1' },
  { id: 2, name: 'Example Title 2', url: 'url2' },
];

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
      <ArticlesList url={'/api/rss'} />
      <FeedForm
        onAddFeed={(feed) => {
          console.log(feed);
        }}
      />
    </div>
  );
};

export default App;
