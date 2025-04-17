import React from 'react';
import useFeedArticles from '~/hooks/useFeedArticles';
import { formatDate } from '~/utils/formatDate';

interface Props {
  url: string;
}

const ArticlesList = ({ url }: Props) => {
  const { articles, error, loading } = useFeedArticles(url);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  if (!articles || articles.length === 0) {
    return <div>No articles available.</div>;
  }

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.pubDate ?? 0).getTime() - new Date(a.pubDate ?? 0).getTime(),
  );

  const feedTitle = sortedArticles[0]?.feedTitle ?? 'Feed';

  return (
    <div className="articles-grid">
      <div className="feed-header">
        <h2>{feedTitle}</h2>
      </div>

      {sortedArticles.map((article, index) => (
        <article key={`${article.link ?? ''}-${index}`} className="article-item">
          {article.link ? (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="article-link"
            >
              {article.title}
            </a>
          ) : (
            <span className="article-link">{article.title}</span>
          )}
          <div className="article-meta">
            <small>{formatDate(article.pubDate)}</small>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticlesList;
