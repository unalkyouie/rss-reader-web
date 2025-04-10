import React, { useState, useEffect } from 'react';
import FeedList,{ Feed } from './components/FeedList';




const App: React.FC = ()=> {

const [feeds, setFeeds] = useState<Array<Feed>>([]);

useEffect(()=>{
  setFeeds([{id:1, title: 'Example Feed 1'}, {id:2, title: 'Example Feed 2'}])
},[])

  return (
   <div>
    <h1>RSS Reader</h1>
    <FeedList feeds={feeds}/>
   </div>
  );
}

export default App;
