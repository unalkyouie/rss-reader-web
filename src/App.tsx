import React, { useState, useEffect } from 'react';
import FeedList from './components/FeedList';
import { mockFeeds } from './__tests__/__mocks__';
import { Feed } from './types';


const App: React.FC = ()=> {

const [feeds, setFeeds] = useState<Array<Feed>>([]);

useEffect(()=>{
  setFeeds(mockFeeds)
},[])

  return (
   <div>
    <h1>RSS Reader</h1>
    <FeedList feeds={feeds}/>
   </div>
  );
}

export default App;
