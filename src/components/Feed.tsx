import React from 'react';
import ArticlesList from './ArticlesList';
import useFeedArticles from '../hooks/useFeedArticles';

interface FeedProps {
  feedUrl: string;
  feedTitle?: string;
  onBack?: () => void;
}

const Feed: React.FC<FeedProps> = ({ feedUrl, feedTitle, onBack }) => {
  const { loading, error } = useFeedArticles(feedUrl);

  return (
    <div className="feed-container">
      <div className="feed-header">
        {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back to Feeds
          </button>
        )}
        <h2>{feedTitle || 'RSS Feed'}</h2>
        <p className="feed-url">{feedUrl}</p>
      </div>

      {error && <div className="error-message">Error loading feed: {error}</div>}

      {loading ? (
        <div className="loading">Loading articles...</div>
      ) : (
        <ArticlesList url={feedUrl} />
      )}
    </div>
  );
};

export default Feed;
