import React, { useState, useEffect } from 'react';
import { mockFeeds } from '~/mocks/index';

import ArticlesList from '~/features/articles/ArticlesList';
import FeedForm from '~/features/feeds/FeedForm';
import FeedList from '~/features/feeds/FeedList';
import { Feed } from '~/types/global';

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
