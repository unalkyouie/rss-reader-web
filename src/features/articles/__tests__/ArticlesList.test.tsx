import { render, screen } from '@testing-library/react';
import ArticlesList from '~/features/articles/ArticlesList';
import { mockArticles } from '../../../../__mocks__';

jest.mock('~/hooks/useFeedArticles', () => ({
  __esModule: true,
  default: () => ({
    articles: mockArticles,
    error: null,
    loading: false,
  }),
}));

describe('ArticlesList', () => {
  it('renders a list of articles sorted by date descending', async () => {
    render(<ArticlesList url="https://example.com/feed" />);

    const titles = screen.getAllByRole('link').map((el) => el.textContent);

    // Ensure articles are sorted correctly by date
    expect(titles).toEqual(['Second Article', 'First Article']);
  });

  it('displays publication date and feed title for each article', async () => {
    render(<ArticlesList url="https://example.com/feed" />);

    mockArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();

      if (article.pubDate) {
        // Match the date formatting as done in the component
        const formattedDate = new Date(article.pubDate).toLocaleString();
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
      } else {
        expect(screen.getByText('Unknown Date')).toBeInTheDocument();
      }
    });

    expect(screen.getAllByRole('link')).toHaveLength(mockArticles.length);
  });
});
