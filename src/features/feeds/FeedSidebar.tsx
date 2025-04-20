import React, { useState } from 'react';
import FeedForm from '~/features/feeds/FeedForm';
import FeedList from '~/features/feeds/FeedList';
import usePersistedFeeds from '~/hooks/usePersistedFeeds';

interface Props {
  selectedFeed?: string;
  onSelectFeed: (url: string) => void;
}

const FeedSidebar = ({ selectedFeed, onSelectFeed }: Props) => {
  const { feeds, addFeed } = usePersistedFeeds();
  const [showForm, setShowForm] = useState(false);

  const handleAddFeed = (feed: { name: string; url: string }) => {
    addFeed(feed);
    setShowForm(false);
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Your feeds</h2>
      <FeedList feeds={feeds} onSelectFeed={onSelectFeed} selectedFeedUrl={selectedFeed} />

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
