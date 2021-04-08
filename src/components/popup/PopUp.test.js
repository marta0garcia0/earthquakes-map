import { render, fireEvent, screen } from '@testing-library/react'
import PopUp from './PopUp';

test('renders Popup', async() => {
  const properties = {
    ids: ',asdfsa,asdf,',
    title: 'titletext',
    status: 'status',
    place: 'place',
  }
	const seeDetail = jest.fn();
  const popup = render(<PopUp properties={properties} seeDetail={seeDetail} />);
  const container = popup.container.querySelector('#popup-container');
	expect(container).toHaveTextContent('title:');
	expect(container).toHaveTextContent('titletext');
	expect(container).toHaveTextContent('ids:');
	expect(container).toHaveTextContent('asdfsa');
  const button = screen.getByRole('button');
  expect(button).toBeTruthy();
});

test('detail click', async() => {
  const properties = {
    ids: ',asdfsa,asdf,',
    title: 'titletext',
    status: 'status',
    place: 'place',
  }
	const seeDetail = jest.fn();
  render(<PopUp properties={properties} seeDetail={seeDetail} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
	expect(seeDetail).toHaveBeenCalled();
});
