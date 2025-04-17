import { render, screen } from '@testing-library/react';
import ArticlesGrid from '~/features/articles/ArticlesGrid';
import { mockArticles } from '../../../../__mocks__';

describe('ArticlesGrid', () => {
  it('renders all articles with title and description', () => {
    render(<ArticlesGrid articles={mockArticles} />);

    mockArticles.forEach((article) => {
      if (article.title) {
        expect(screen.getByText(article.title)).toBeInTheDocument();
      }

      if (article.description) {
        expect(screen.getByText(article.description)).toBeInTheDocument();
      }
    });
  });

  it('renders article titles as links when link is available', () => {
    render(<ArticlesGrid articles={mockArticles} />);

    mockArticles.forEach((article) => {
      if (article.title) {
        const titleEl = screen.getByText(article.title);
        const link = titleEl.closest('a');

        if (article.link) {
          expect(link).toHaveAttribute('href', article.link);
        } else {
          expect(link).toBeNull();
        }
      }
    });
  });
});
