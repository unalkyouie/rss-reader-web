import { render } from '@testing-library/react';
import ArticleDetail from '~/features/articles/ArticleDetail';
import { Article } from '~/types/global';

describe('ArticleDetail', () => {
  const mockArticle: Article = {
    title: 'Test Article',
    link: 'https://example.com',
    pubDate: '2025-04-20T12:00:00Z',
    content: 'This is the content of the test article.',
  };

  it('renders article details correctly', () => {
    const { getByText, getByRole } = render(<ArticleDetail article={mockArticle} />);

    expect(getByText('Test Article')).toBeInTheDocument();
    expect(getByText('This is the content of the test article.')).toBeInTheDocument();
    expect(getByText('April 20, 2025 at 2:00:00 PM')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });

  it('renders "No content available" if no content is provided', () => {
    const articleWithoutContent = { ...mockArticle, content: undefined };

    const { getByText } = render(<ArticleDetail article={articleWithoutContent} />);

    expect(getByText('No content available')).toBeInTheDocument();
  });

  it('renders "Article not found" when no article is passed', () => {
    const { getByText } = render(<ArticleDetail article={null} />);

    expect(getByText('Article not found')).toBeInTheDocument();
  });
});
