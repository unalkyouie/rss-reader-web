import React from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '~/types/global';

const ArticleDetails = () => {
  const { id } = useParams();
  const articles = JSON.parse(localStorage.getItem('articles') || '[]');
  const article = articles.find((a: Article) => a.id === id);

  if (!article) {
    return <div className="article-not-found">Article not found</div>;
  }

  return (
    <div className="article-detail-container">
      <h1 className="article-title">{article.title}</h1>
      {article.content ? (
        <p className="article-content">{article.content}</p>
      ) : (
        <div className="no-content">
          <p className="article-description">{article.description || 'No description available'}</p>
          <a
            className="read-more-link"
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on the official website
          </a>
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
