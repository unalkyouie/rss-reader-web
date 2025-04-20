import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '~/styles/main.css';
import MainView from '~/components/MainView';
import ArticleDetail from '~/features/articles/ArticleDetails';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
