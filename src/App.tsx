import React, { useState, useEffect } from 'react';
import FeedList from './components/features/feeds/FeedList';
import { mockFeeds } from '../__mocks__'
import { Feed } from './types/global';
import FeedForm from './components/features/feeds/FeedForm';
import ArticlesList from './components/features/articles/ArticlesList';


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
