import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '~/types/global';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useFavoriteArticles from '~/hooks/useFavorites';

interface Props {
  articles: Array<Article>;
  onFavoriteChange?: () => void;
}

const ArticlesGrid = ({ articles, onFavoriteChange }: Props) => {
  const { isFavorite, toggleFavorite } = useFavoriteArticles();
  const navigate = useNavigate();
  const readArticles = useRef(
    new Set<string>(JSON.parse(localStorage.getItem('readArticles') || '[]'))
  );

  const handleSelectFeed = useCallback((id: string) => {
    readArticles.current.add(id);
    localStorage.setItem('readArticles', JSON.stringify([...readArticles.current]));
    navigate(`/articles/${id}`);
  }, [navigate]);

  const onFavoriteClick = useCallback(
    (article: Article) => {
      if (isFavorite(article.id)) {
        const confirm = window.confirm('Are you sure you want to remove this from favorites?');
        if (!confirm) return;
      }
      toggleFavorite(article);
      onFavoriteChange?.();
    },
    [toggleFavorite, isFavorite, onFavoriteChange]
  );

  return (
    <div className="articles-grid" data-testid="articles-grid">
      {articles.map((article, index) => {
        const id = article.id || String(index);
        const isRead = readArticles.current.has(id);
        const favorite = isFavorite(id);

        return (
          <div
            key={article.id || index}
            className={`article-item ${isRead ? 'read' : ''}`}
            data-testid={`article-item-${article.id}`}
          >
            {article.title && <h2>{article.title}</h2>}
            {article.description && <p>{article.description}</p>}
            <button onClick={() => handleSelectFeed(article.id)}>Read more</button>
            <button
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => onFavoriteClick(article)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {favorite ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesGrid;
