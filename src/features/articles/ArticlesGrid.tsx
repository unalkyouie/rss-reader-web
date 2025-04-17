import React from 'react';
import { ParsedArticle } from '~/types/global';

const ArticlesGrid = ({ articles }: { articles: Array<ParsedArticle> }) => {
  return (
    <div className="articles-grid">
      {articles.map((article, index) => (
        <div className="article-item" key={index}>
          {article.link ? (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="article-link"
            >
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </a>
          ) : (
            <div className="article-link">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArticlesGrid;
