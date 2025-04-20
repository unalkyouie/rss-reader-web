import React, { useEffect, useState } from 'react';

interface Props {
  onAddFeed: (feed: { name: string; url: string }) => void;
  initialData?: { name: string; url: string };
  isEdit?: boolean;
  onCancel?: () => void;
}

const FeedForm = ({ onAddFeed, initialData, isEdit = false, onCancel }: Props) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setUrl(initialData.url);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;
    onAddFeed({ name, url });
    setName('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="feed-form">
      <div className="form-group">
        <label htmlFor="feed-name">Feed Name</label>
        <input
          id="feed-name"
          type="text"
          placeholder="e.g. TechCrunch"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="feed-url">Feed URL</label>
        <input
          id="feed-url"
          type="url"
          placeholder="https://example.com/rss"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="submit">{isEdit ? 'Update Feed' : 'Add Feed'}</button>
        {isEdit && onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default FeedForm;
