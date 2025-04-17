import { render, screen, fireEvent } from '@testing-library/react';
import FeedList from '~/features/feeds/FeedList';
import { mockFeeds } from '../../../../__mocks__';

describe('FeedList', () => {
  it('renders a list of feeds with clickable items', () => {
    const handleSelectFeed = jest.fn();

    render(<FeedList feeds={mockFeeds} onSelectFeed={handleSelectFeed} />);

    mockFeeds.forEach((feed) => {
      expect(screen.getByText(feed.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(mockFeeds[0].name));
    expect(handleSelectFeed).toHaveBeenCalledWith(mockFeeds[0].url);
  });

  it('applies selected class to the selected feed item', () => {
    const selectedFeedUrl = mockFeeds[1].url;

    render(
      <FeedList feeds={mockFeeds} onSelectFeed={() => {}} selectedFeedUrl={selectedFeedUrl} />,
    );

    const selectedItem = screen.getByText(mockFeeds[1].name);
    expect(selectedItem.className).toMatch(/selected/);
  });

  it('shows a message when there are no feeds', () => {
    render(<FeedList feeds={[]} onSelectFeed={() => {}} />);

    expect(screen.getByText('No feeds available')).toBeInTheDocument();
  });
});
