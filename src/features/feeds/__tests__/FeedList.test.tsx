import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeedList from '~/features/feeds/FeedList';
import { mockFeeds } from '../../../../__mocks__';

jest.mock('~/hooks/usePersistedFeeds', () => ({
  __esModule: true,
  default: () => ({
    feeds: mockFeeds,
    removeFeed: jest.fn(),
    updateFeed: jest.fn(),
  }),
}));

describe('FeedList', () => {
  it('renders all feeds correctly', () => {
    render(
      <MemoryRouter>
        <FeedList
          feeds={mockFeeds}
          selectedFeed={mockFeeds[0].url}
          onSelectFeed={jest.fn()}
          removeFeed={jest.fn()}
          updateFeed={jest.fn()}
        />
      </MemoryRouter>,
    );

    mockFeeds.forEach((feed) => {
      expect(screen.getByText(feed.name)).toBeInTheDocument();
    });
  });

  it('shows edit form when clicking edit and cancels edit', () => {
    render(
      <MemoryRouter>
        <FeedList
          feeds={mockFeeds}
          selectedFeed={mockFeeds[0].url}
          onSelectFeed={jest.fn()}
          removeFeed={jest.fn()}
          updateFeed={jest.fn()}
        />
      </MemoryRouter>,
    );

    const editBtn = screen.getAllByLabelText(/edit feed/i)[0];
    fireEvent.click(editBtn);

    expect(screen.getByDisplayValue('Example Feed 1')).toBeInTheDocument();

    const cancelBtn = screen.getByLabelText(/cancel edit/i);
    fireEvent.click(cancelBtn);

    expect(screen.queryByDisplayValue('Example Feed 1')).not.toBeInTheDocument();
  });

  it('asks for confirmation on delete', () => {
    window.confirm = jest.fn(() => true);

    render(
      <MemoryRouter>
        <FeedList
          feeds={mockFeeds}
          selectedFeed={mockFeeds[0].url}
          onSelectFeed={jest.fn()}
          removeFeed={jest.fn()}
          updateFeed={jest.fn()}
        />
      </MemoryRouter>,
    );
    const deleteBtn = screen.getAllByLabelText(/delete feed/i)[0];
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalled();
  });
});
