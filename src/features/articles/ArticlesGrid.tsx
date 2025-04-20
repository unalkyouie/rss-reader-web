import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '~/types/global';

interface Props {
  articles: Array<Article>;
}

const ArticlesGrid = ({ articles }: Props) => {
  const navigate = useNavigate();
  const readArticles = useRef(
    new Set<string>(JSON.parse(localStorage.getItem('readArticles') || '[]')),
  );

  const handleSelectFeed = useCallback((id: string) => {
    readArticles.current.add(id);
    localStorage.setItem('readArticles', JSON.stringify([...readArticles.current]));
    navigate(`/articles/${id}`);
  }, []);

  return (
    <div className="articles-grid" data-testid="articles-grid">
      {articles.map((article, index) => {
        const isRead = readArticles.current.has(article.id ?? '');
        return (
          <div
            key={article.id || index}
            className={`article-item ${isRead ? 'read' : ''}`}
            data-testid={`article-item-${article.id}`}
          >
            {article.title && <h2>{article.title}</h2>}
            {article.description && <p>{article.description}</p>}
            <button onClick={() => handleSelectFeed(article.id)}>Read more</button>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesGrid;
