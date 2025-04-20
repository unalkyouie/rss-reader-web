import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArticlesGrid from '~/features/articles/ArticlesGrid';
import { mockArticles } from '../../../../__mocks__';
import { Article } from '~/types/global';

const typedMockArticles: Array<Article & { id?: string | number }> = mockArticles;

describe('ArticlesGrid', () => {
  const renderWithRouter = (articles: Array<Article & { id?: string | number }>) => {
    return render(
      <MemoryRouter>
        <ArticlesGrid articles={articles} />
      </MemoryRouter>,
    );
  };

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

  it('renders a "Read more" link for each article with a link, pointing to the correct route', () => {
    renderWithRouter(typedMockArticles);

    typedMockArticles.forEach((article, index) => {
      let articleItem: HTMLElement | null = null;
      if (article.title) {
        const titleElement = screen.getByText(new RegExp(article.title, 'i'));
        articleItem = titleElement.closest('.article-item');
      } else {
        articleItem = screen.getByTestId(`article-item-${article.id || index}`);
      }

      expect(articleItem).toBeInTheDocument();

      const readMoreLink = within(articleItem as HTMLElement).getByRole('link', {
        name: /read more/i,
      });

      expect(readMoreLink).toBeInTheDocument();
      expect(readMoreLink).toHaveAttribute('href', `/articles/${article.id}`);
    });
  });
});
