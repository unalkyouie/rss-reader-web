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
    <div className="article-details">
      <h1>{article.title}</h1>
      {article.description && <p className="description">{article.description}</p>}
      {article.content ? (
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
      ) : (
        <div className="no-content">
          <p>This article has no content available.</p>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            Read more on the official website →
          </a>
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
