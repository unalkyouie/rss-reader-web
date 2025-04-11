import {render, screen, fireEvent} from '@testing-library/react';
import FeedForm from '../components/FeedForm';

describe('FeedForm', ()=>{
    it('calls onAddFeed with name and URL when form is submitted', ()=>{

        const onAddFeed = jest.fn();
        render(<FeedForm onAddFeed={onAddFeed} />);

        const nameInput = screen.getByPlaceholderText(/feed name/i);
        const urlInput = screen.getByPlaceholderText(/feed url/i);
        const button = screen.getByText(/add feed/i);

        fireEvent.change(nameInput, {target:{ value: 'Changed Feed'}});
        fireEvent.change(urlInput, {target:{ value: 'url'}});
        fireEvent.click(button);

        expect(onAddFeed).toHaveBeenCalledWith({
            name:'Changed Feed', 
            url: 'url'
        })
    })
})