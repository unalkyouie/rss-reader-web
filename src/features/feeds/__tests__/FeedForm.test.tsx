import { render, screen, fireEvent } from '@testing-library/react';
import FeedForm from '~/features/feeds/FeedForm';

describe('FeedForm', () => {
  it('submits updated feed when editing', () => {
    const handleUpdate = jest.fn();

    render(
      <FeedForm
        onAddFeed={handleUpdate}
        initialData={{ name: 'Test Feed', url: 'https://test.com' }}
        isEdit
      />,
    );

    const nameInput = screen.getByLabelText(/feed name/i);
    const urlInput = screen.getByLabelText(/feed url/i);
    const submit = screen.getByRole('button', { name: /update feed/i });

    fireEvent.change(nameInput, { target: { value: 'Updated Feed' } });
    fireEvent.change(urlInput, { target: { value: 'https://updated.com' } });
    fireEvent.click(submit);

    expect(handleUpdate).toHaveBeenCalledWith({
      name: 'Updated Feed',
      url: 'https://updated.com',
    });
  });
});
