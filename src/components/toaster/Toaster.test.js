import { render, screen } from '@testing-library/react'
import Toaster from './Toaster';

test('renders Toaster', async() => {
  render(<Toaster state={'something went wrong'} />);
	expect(screen.getByText('something went wrong')).toBeTruthy();
});
