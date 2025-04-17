import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticlesList from '~/features/articles/ArticlesList';
import { formatDate } from '~/utils/formatDate';

jest.mock('~/hooks/useFeedArticles', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useFeedArticles from '~/hooks/useFeedArticles';

const mockArticles = [
  {
    title: 'Second Article',
    link: 'https://example.com/second',
    pubDate: '2025-04-15T12:00:00Z',
    feedTitle: 'Mock Feed',
    description: 'Description of second article',
  },
  {
    title: 'First Article',
    link: 'https://example.com/first',
    pubDate: '2025-04-14T09:00:00Z',
    feedTitle: 'Mock Feed',
    description: 'Description of first article',
  },
];

describe('ArticlesList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useFeedArticles as jest.Mock).mockReturnValue({
      articles: [],
      loading: true,
      error: null,
    });

    render(<ArticlesList url="https://example.com/feed" />);
    expect(screen.getByText(/loading articles/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useFeedArticles as jest.Mock).mockReturnValue({
      articles: [],
      loading: false,
      error: 'Failed to fetch feed',
    });

    render(<ArticlesList url="https://example.com/feed" />);
    expect(screen.getByText(/error: failed to fetch feed/i)).toBeInTheDocument();
  });

  it('renders empty state when no articles exist', () => {
    (useFeedArticles as jest.Mock).mockReturnValue({
      articles: [],
      loading: false,
      error: null,
    });

    render(<ArticlesList url="https://example.com/feed" />);
    expect(screen.getByText(/no articles available/i)).toBeInTheDocument();
  });

  it('renders sorted articles with feed title and formatted date', () => {
    (useFeedArticles as jest.Mock).mockReturnValue({
      articles: mockArticles,
      loading: false,
      error: null,
    });

    render(<ArticlesList url="https://example.com/feed" />);

    expect(screen.getByRole('heading', { name: /mock feed/i })).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('Second Article');
    expect(links[1]).toHaveTextContent('First Article');

    expect(screen.getByText(formatDate(mockArticles[0].pubDate))).toBeInTheDocument();
    expect(screen.getByText(formatDate(mockArticles[1].pubDate))).toBeInTheDocument();
  });

  it('renders article without link as plain text', () => {
    const noLinkArticles = [
      {
        ...mockArticles[0],
        link: null,
        title: 'No Link Article',
      },
    ];

    (useFeedArticles as jest.Mock).mockReturnValue({
      articles: noLinkArticles,
      loading: false,
      error: null,
    });

    render(<ArticlesList url="https://example.com/feed" />);

    expect(screen.getByText('No Link Article')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'No Link Article' })).not.toBeInTheDocument();
  });
});
