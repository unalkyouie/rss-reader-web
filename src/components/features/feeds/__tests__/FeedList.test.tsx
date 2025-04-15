import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import FeedList from '~/features/feeds/FeedList';
import { mockFeeds } from '~/mocks/index';

describe('FeedList', () => {
  it('renders a list of feeds', () => {
    render(<FeedList feeds={mockFeeds} />);

    expect(screen.getByText('Example Title 1')).toBeInTheDocument();
    expect(screen.getByText('Example Title 2')).toBeInTheDocument();
  });
  it('shows a message when there are no feeds', () => {
    render(<FeedList feeds={[]} />);
    expect(screen.getByText('No feeds available')).toBeInTheDocument();
  });
});
