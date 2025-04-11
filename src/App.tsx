import React, { useState, useEffect } from 'react';
import FeedList from './components/FeedList';
import { mockArticles, mockFeeds } from './__tests__/__mocks__';
import { Feed } from './types';
import FeedForm from './components/FeedForm';
import ArticlesList from './components/ArticlesList';


const App: React.FC = ()=> {

const [feeds, setFeeds] = useState<Array<Feed>>([]);

useEffect(()=>{
  setFeeds(mockFeeds)
},[])

  return (
   <div>
    <h1>RSS Reader</h1>
    <FeedList feeds={feeds}/>
    <ArticlesList articles={mockArticles} />
    <FeedForm onAddFeed={(feed)=>{console.log(feed)}} />
   </div>
  );
}

export default App;
