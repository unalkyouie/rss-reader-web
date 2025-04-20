import React from 'react';
import { Article } from '~/types/global';
import { formatDate } from '~/utils/formatDate';

interface Props {
  article: Article | null;
}

const ArticleDetail = ({ article }: Props) => {
  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="article-detail">
      <h1 className="article-detail__title">{article.title}</h1>
      <p className="article-detail__date">{formatDate(article.pubDate)}</p>
      <p className="article-detail__content">{article.content || 'No content available'}</p>
      <a
        className="article-detail__link"
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more
      </a>
    </div>
  );
};

export default ArticleDetail;
