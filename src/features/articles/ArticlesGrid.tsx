import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '~/types/global';

interface Props {
  articles: Array<Article>;
}

const ArticlesGrid = ({ articles }: Props) => {
  localStorage.setItem('articles', JSON.stringify(articles));

  return (
    <div className="articles-grid" data-testid="articles-grid">
      {articles.map((article) => {
        return (
          <div key={article.id} className="article-item" data-testid={`article-item-${article.id}`}>
            {article.title && <h2>{article.title}</h2>}
            {article.description && <p>{article.description}</p>}
            <Link to={`/articles/${article.id}`}>Read more</Link>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesGrid;
