import { render, screen, waitFor, act } from '@testing-library/react';
import { mockArticles } from '../../../../__mocks__';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ArticleDetail from '~/features/articles/ArticleDetails';

describe('ArticleDetail', () => {
  it('renders the article details when an article is found in localStorage', async () => {
    localStorage.setItem('articles', JSON.stringify([mockArticles[0]]));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/articles/${mockArticles[0].id}`]}>
          <Routes>
            <Route path="/articles/:id" element={<ArticleDetail />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    await waitFor(() => screen.getByText(mockArticles[0].title));

    expect(screen.getByText(mockArticles[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockArticles[0].content || 'No content available')).toBeInTheDocument();
  });

  it('shows "Article not found" when article is not found in localStorage', async () => {
    localStorage.setItem('articles', JSON.stringify([]));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/articles/nonexistent-article']}>
          <Routes>
            <Route path="/articles/:id" element={<ArticleDetail />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    await waitFor(() => screen.getByText('Article not found'));

    expect(screen.getByText('Article not found')).toBeInTheDocument();
  });
});
