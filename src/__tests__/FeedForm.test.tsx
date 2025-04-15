import { render, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event'; // Import userEvent
import FeedForm from '../components/FeedForm';

describe('FeedForm', () => {
  it('calls onAddFeed with name and URL when form is submitted', async () => {
    // Setup the user event instance
    const user = userEvent.setup();
    
    // Create the mock function
    const onAddFeed = jest.fn();
    
    // Render the component
    render(<FeedForm onAddFeed={onAddFeed} />);

    // Get the form elements
    const nameInput = screen.getByPlaceholderText(/feed name/i);
    const urlInput = screen.getByPlaceholderText(/feed url/i);
    const button = screen.getByText(/add feed/i);

    // Wrap user interactions in act
    await act(async () => {
      // Type in the name input
      await user.type(nameInput, 'Changed Feed');
      
      // Type in the URL input
      await user.type(urlInput, 'url');
      
      // Click the submit button
      await user.click(button);
    });

    // Check if onAddFeed was called with the correct values
    expect(onAddFeed).toHaveBeenCalledWith({
      name: 'Changed Feed',
      url: 'url',
    });
    expect(onAddFeed).toHaveBeenCalledTimes(1);
  });
});
