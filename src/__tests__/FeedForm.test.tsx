import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event'; // Import userEvent
import FeedForm from '../components/FeedForm';

describe('FeedForm', () => {
  it('calls onAddFeed with name and URL when form is submitted', async () => {
    const onAddFeed = jest.fn();
    render(<FeedForm onAddFeed={onAddFeed} />);

    const nameInput = screen.getByPlaceholderText(/feed name/i);
    const urlInput = screen.getByPlaceholderText(/feed url/i);
    const button = screen.getByText(/add feed/i);

    // Simulating user inputs
    await userEvent.type(nameInput, 'Changed Feed'); // Use userEvent.type for input
    await userEvent.type(urlInput, 'url'); // Use userEvent.type for input

    // Clicking the submit button
    await userEvent.click(button); // Use userEvent.click

    // Check if onAddFeed was called with the correct values
    expect(onAddFeed).toHaveBeenCalledWith({
      name: 'Changed Feed',
      url: 'url',
    });
    expect(onAddFeed).toHaveBeenCalledTimes(1); // Ensure it's called only once
  });
});
