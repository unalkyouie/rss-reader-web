import { render } from '@testing-library/react';
import ArticleDetail from '~/features/articles/ArticleDetail';

describe('ArticleDetails', () => {
  test('renders ArticleDetail component', () => {
    const article = {
      title: 'Test Article',
      content: 'This is a test article content.',
      link: 'https://example.com',
    };

    const { getByText, getByRole } = render(<ArticleDetail article={article} />);

    expect(getByText('Test Article')).toBeInTheDocument();
    expect(getByText('This is a test article content.')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });
});
