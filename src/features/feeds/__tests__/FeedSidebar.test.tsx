import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArticlesGrid from '~/features/articles/ArticlesGrid';
import { mockArticles } from '../../../../__mocks__';
import { Article } from '~/types/global';

const typedMockArticles: Array<Article & { id?: string | number }> = mockArticles;

describe('ArticlesGrid', () => {
  const renderWithRouter = (
    articles: Array<Article & { id?: string | number }>,
    showUnreadOnly = false,
  ) => {
    return render(
      <MemoryRouter>
        <ArticlesGrid articles={articles} showUnreadOnly={showUnreadOnly} />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders all articles with title and description', () => {
    renderWithRouter(typedMockArticles);

    typedMockArticles.forEach((article) => {
      if (article.title) {
        expect(screen.getByText(new RegExp(article.title, 'i'))).toBeInTheDocument();
      }

      if (article.description) {
        expect(screen.getByText(new RegExp(article.description, 'i'))).toBeInTheDocument();
      }
    });
  });

  it('marks an article as read and stores it in localStorage on click', () => {
    renderWithRouter(typedMockArticles);
    const firstArticle = typedMockArticles[0];

    const button = screen.getByRole('button', { name: /read more/i });
    fireEvent.click(button);

    const stored = JSON.parse(localStorage.getItem('readArticles') || '[]');
    expect(stored).toContain(firstArticle.id);
  });

  it('applies the "read" class to read articles', () => {
    const firstArticle = typedMockArticles[0];
    localStorage.setItem('readArticles', JSON.stringify([firstArticle.id]));

    renderWithRouter(typedMockArticles);

    const articleEl = screen.getByTestId(`article-item-${firstArticle.id}`);
    expect(articleEl).toHaveClass('read');
  });

  it('filters out read articles when showUnreadOnly is true', () => {
    const firstArticle = typedMockArticles[0];
    localStorage.setItem('readArticles', JSON.stringify([firstArticle.id]));

    renderWithRouter(typedMockArticles, true);

    expect(screen.queryByTestId(`article-item-${firstArticle.id}`)).not.toBeInTheDocument();
  });
});
