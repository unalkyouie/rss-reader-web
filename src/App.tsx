import React from 'react';
import '~/styles/main.css';
import MainView from '~/components/MainView';

const App: React.FC = () => {
  return (
    <div className="main-feed-page">
      <MainView />
    </div>
  );
};

export default App;
