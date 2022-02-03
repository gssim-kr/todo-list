import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);

    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();

    const appLogo = screen.getByAltText('logo');
    expect(appLogo).toBeInTheDocument();
    expect(appLogo).toHaveAttribute('src','logo.svg');

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.getElementsByTagName('p')).toHaveLength(1);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.getElementsByTagName('p')[0]).toHaveTextContent('Edit src/App.tsx and save'
        + ' to reload')

    expect(container).toMatchSnapshot();
  });
});