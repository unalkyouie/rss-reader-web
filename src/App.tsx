import React, { useState, useEffect } from 'react';
import FeedList from './components/FeedList';
import { mockFeeds } from './__tests__/__mocks__';
import { Feed } from './types';
import FeedForm from './components/FeedForm';
import ArticlesList from './components/ArticlesList';


const App: React.FC = ()=> {
  const [feeds, setFeeds] = useState<Array<Feed>>([]);

  useEffect(()=>{
    console.log('App component mounted');
    setFeeds(mockFeeds);
  },[]);

  return (
   <div>
    <h1>RSS Reader</h1>
    <FeedList feeds={feeds}/>
    <ArticlesList url={'/api/rss'} />
    <FeedForm onAddFeed={(feed)=>{console.log(feed)}} />
   </div>
  );
}

export default App;
