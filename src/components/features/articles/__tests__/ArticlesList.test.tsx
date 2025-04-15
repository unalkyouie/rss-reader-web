import { render, screen } from "@testing-library/react"
import { mockArticles } from "../../../../../__mocks__"
import ArticlesList from "../components/features/articles/ArticlesList";

jest.mock("../hooks/useFeedArticles", () => ({
    __esModule: true,
    default: () => ({
        articles: mockArticles,
        error: null,
        loading: false
    })
}));

describe('ArticlesList', () => {
    it('renders a list of articles sorted by date descending', async () => {
        render(<ArticlesList url="https://example.com/feed" />);

        const titles = screen.getAllByRole('link').map(el => el.textContent);
        expect(titles).toEqual(['Second Article', 'First Article']);
    });

    it('displays publication date and feed title for each article', async () => {
        render(<ArticlesList url="https://example.com/feed" />);

        expect(screen.getByText(/Example Title 1/)).toBeInTheDocument();
        expect(screen.getByText(/Example Title 2/)).toBeInTheDocument();
        expect(screen.getAllByText(/\d{1,2}\/\d{1,2}\/\d{4}/).length).toBe(2);
    });
});