
import {render, screen} from '@testing-library/react';
import FeedList, { Feed } from '../components/FeedList';

const mockFeeds: Feed[]=[
    {id:1, title: 'Example Title 1'},
    {id:2, title: 'Example Title 2'}
]

describe('FeedList', ()=>{
    it('renders a list of feeds',() => {
        render (<FeedList feeds={mockFeeds} />);

        expect(screen.getByText('Example Title 1')).toBeInTheDocument();
        expect(screen.getByText('Example Title 2')).toBeInTheDocument();
    });
    it('shows a message when there are no feeds', () => {
        render(<FeedList feeds={[]} />);
        expect(screen.getByText('No feeds available')).toBeInTheDocument();
    })
})