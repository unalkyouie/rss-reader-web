import { render, screen, fireEvent } from '@testing-library/react';
import FeedSidebar from '../FeedSidebar';

jest.mock('~/hooks/usePersistedFeeds', () => ({
  default: () => ({
    feeds: [{ name: 'Test Feed', url: 'https://example.com/feed' }],
    addFeed: jest.fn(),
  }),
  __esModule: true,
}));

describe('FeedSidebar', () => {
  it('renders feed list and toggle button', () => {
    render(<FeedSidebar selectedFeed="https://example.com/feed" onSelectFeed={() => {}} />);
    expect(screen.getByText('Your feeds')).toBeInTheDocument();
    expect(screen.getByText('Add new feed')).toBeInTheDocument();
  });

  it('toggles feed form', () => {
    render(<FeedSidebar selectedFeed="https://example.com/feed" onSelectFeed={() => {}} />);
    const toggleButton = screen.getByText('Add new feed');
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Cancel');
  });
});
