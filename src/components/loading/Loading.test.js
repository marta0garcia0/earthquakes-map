import { render, screen } from '@testing-library/react';
import Loading from './Loading';

test('renders App', async() => {
  render(<Loading />);
  const logoElement = await screen.findByRole('img');
  expect(logoElement).toHaveAttribute('src');
  expect(logoElement.src).toContain('loading.gif');
});
