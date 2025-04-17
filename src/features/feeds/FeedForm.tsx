import React, { useState } from 'react';

type Props = {
  onAddFeed: (feed: { name: string; url: string }) => void;
};

const FeedForm = ({ onAddFeed }: Props) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !url.trim()) {
      setError('Both fields are required');
      return;
    }

    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    onAddFeed({ name, url });
    setName('');
    setUrl('');
    setError('');
  };

  return (
    <div className="feed-form">
      <form onSubmit={handleSubmit}>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Feed</button>
      </form>
    </div>
  );
};

export default FeedForm;
