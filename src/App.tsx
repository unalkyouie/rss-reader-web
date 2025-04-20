import React from 'react';
import '~/styles/main.css';
import MainView from '~/components/MainView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-feed-page">
        <MainView />
      </div>
    </QueryClientProvider>
  );
};

export default App;
