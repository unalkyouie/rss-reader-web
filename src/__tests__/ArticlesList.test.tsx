import { render } from "@testing-library/react"
import { mockArticles } from "./__mocks__"
import { screen } from "@testing-library/dom";
import ArticlesList from "../components/ArticlesList";


describe('ArticlesList', ()=>{
    it('renders a list of articles sorted by date descending', ()=>{
        render(<ArticlesList articles={mockArticles}/>);

        const titles = screen.getAllByRole('link').map((el)=>el.textContent);
        expect(titles).toEqual(['Second Article', 'First Article']);
    });
    it('displays publication date and feed title for each article', ()=>{
        render(<ArticlesList articles={mockArticles}/>);

        expect(screen.getByText(/Example Title 1/)).toBeInTheDocument();
        expect(screen.getByText(/Example Title 2/)).toBeInTheDocument();
        expect(screen.getAllByText(/\d{4}/).length).toBeGreaterThan(0);
    })
})