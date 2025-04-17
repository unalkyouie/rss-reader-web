import React from 'react';
import { Feed } from '~/types/global';

type Props = {
  feeds: Array<Feed>;
  onSelectFeed: (url: string) => void;
  selectedFeedUrl?: string;
};

const FeedList = ({ feeds, onSelectFeed, selectedFeedUrl }: Props) => {
  if (!feeds.length) {
    return <p>No feeds available</p>;
  }

  return (
    <div className="feed-list">
      <h3>Your Feeds</h3>
      <ul>
        {feeds.map((feed) => (
          <li
            key={feed.id}
            onClick={() => onSelectFeed(feed.url)}
            className={`feed-item ${selectedFeedUrl === feed.url ? 'selected' : ''}`}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            {feed.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedList;
