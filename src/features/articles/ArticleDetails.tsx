import React from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '~/types/global';

const ArticleDetails = () => {
  const { id } = useParams();
  const articles = JSON.parse(localStorage.getItem('articles') || '[]');
  const article = articles.find((a: Article) => a.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content || 'No content available'}</p>
    </div>
  );
};

export default ArticleDetails;
