import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', async() => {
  render(<App />);
  const linkElement = screen.getByText(/Earthquakes map/i);
  expect(linkElement).toBeInTheDocument();
  const logoElement = await screen.findAllByRole('img');
  expect(logoElement[0]).toHaveAttribute('src');
  expect(logoElement[0].src).toContain('globe-7-256.png');
});
