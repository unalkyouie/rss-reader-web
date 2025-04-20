import React, { useState } from 'react';
import usePersistedFeeds from '~/hooks/usePersistedFeeds';
import FeedForm from './FeedForm';

interface Props {
  selectedFeed?: string;
  onSelectFeed: (url: string) => void;
}

const FeedList = ({ selectedFeed, onSelectFeed }: Props) => {
  const { feeds, removeFeed, updateFeed } = usePersistedFeeds();
  const [editingFeedUrl, setEditingFeedUrl] = useState<string | null>(null);

  const handleUpdate = (updates: { name: string; url: string }) => {
    if (editingFeedUrl) {
      updateFeed(editingFeedUrl, updates);
      setEditingFeedUrl(null);
    }
  };

  const handleDelete = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    const confirm = window.confirm('Are you sure you want to delete this feed?');
    if (confirm) {
      removeFeed(url);
      if (editingFeedUrl === url) setEditingFeedUrl(null);
    }
  };

  return (
    <ul className="feed-list">
      {feeds.map((feed) => {
        const isEditing = editingFeedUrl === feed.url;
        return (
          <li
            key={feed.url}
            className={`feed-item ${feed.url === selectedFeed ? 'selected' : ''}`}
            onClick={() => onSelectFeed(feed.url)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{feed.name}</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                {isEditing ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingFeedUrl(null);
                    }}
                    aria-label="Cancel edit"
                    title="Cancel"
                  >
                    ❌
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingFeedUrl(feed.url);
                    }}
                    aria-label="Edit feed"
                    title="Edit"
                  >
                    ✏️
                  </button>
                )}
                <button
                  onClick={(e) => handleDelete(e, feed.url)}
                  aria-label="Delete feed"
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>
            {isEditing && <FeedForm onAddFeed={handleUpdate} initialData={feed} isEdit />}
          </li>
        );
      })}
    </ul>
  );
};

export default FeedList;
