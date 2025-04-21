import { render, screen, waitFor } from '@testing-library/react';
import { mockArticles } from '../../../../__mocks__';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ArticleDetail from '~/features/articles/ArticleDetails';
import { sanitizeId } from '~/utils/sanitazeId';

const renderWithQueryClient = (initialEntry: string, articles = mockArticles) => {
  const queryClient = new QueryClient();

  queryClient.setQueryData(['feedArticles', 'https://example.com/rss'], articles);

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('ArticleDetail', () => {
  it('renders the article details when found in React Query cache', async () => {
    const article = mockArticles[0];
    const id = sanitizeId(article.link || article.title || '');

    renderWithQueryClient(`/articles/${id}`, [article]);

    await waitFor(() => screen.getByText(article.title));

    expect(screen.getByText(article.title)).toBeInTheDocument();
    if (article.content) {
      expect(screen.getByText(/Content/i)).toBeInTheDocument();
    } else {
      expect(screen.getByText('This article has no content available.')).toBeInTheDocument();
    }
  });

  it('shows "Article not found" when article is not in cache', async () => {
    renderWithQueryClient(`/articles/nonexistent-id`, []);

    await waitFor(() => screen.getByText('Article not found'));

    expect(screen.getByText('Article not found')).toBeInTheDocument();
  });
});
