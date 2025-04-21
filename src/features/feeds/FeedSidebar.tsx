import React, { useState } from 'react';
import FeedForm from '~/features/feeds/FeedForm';
import FeedList from '~/features/feeds/FeedList';
import usePersistedFeeds from '~/hooks/usePersistedFeeds';

interface Props {
  selectedFeed?: string;
  onSelectFeed: (url: string) => void;
  showUnreadOnly: boolean;
  onToggleUnread: () => void;
}

const FeedSidebar = ({ selectedFeed, onSelectFeed, showUnreadOnly, onToggleUnread }: Props) => {
  const { feeds, removeFeed, updateFeed, addFeed } = usePersistedFeeds();
  const [showForm, setShowForm] = useState(false);

  const handleAddFeed = (feed: { name: string; url: string }) => {
    addFeed(feed);
    setShowForm(false);
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Your feeds</h2>

      <button
        onClick={onToggleUnread}
        style={{
          fontSize: '12px',
          padding: '6px 10px',
          borderRadius: '6px',
          background: showUnreadOnly ? '#e0f7fa' : '#fff',
          border: '1px solid #ccc',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {showUnreadOnly ? 'Show all' : 'Show unread'}
      </button>

      <FeedList
        onSelectFeed={onSelectFeed}
        selectedFeed={selectedFeed}
        removeFeed={removeFeed}
        updateFeed={updateFeed}
        feeds={feeds}
      />

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="toggle-form-btn"
        aria-expanded={showForm}
      >
        {showForm ? 'Cancel' : 'Add new feed'}
      </button>

      <div className={`collapsible-form ${showForm ? 'open' : ''}`}>
        {showForm && <FeedForm onAddFeed={handleAddFeed} />}
      </div>
    </aside>
  );
};

export default FeedSidebar;
