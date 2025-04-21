import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Article } from '~/types/global';
import { sanitizeId } from '~/utils/sanitazeId';

const ArticleDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const allArticles: Article[] = queryClient
    .getQueryCache()
    .getAll()
    .filter((q) => q.queryKey?.[0] === 'feedArticles')
    .flatMap((q) => q.state.data || []) as Article[];

  const article = allArticles.find((a) => sanitizeId(a.link || '') === id);

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
          {article.link && (
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read more on the official website →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
