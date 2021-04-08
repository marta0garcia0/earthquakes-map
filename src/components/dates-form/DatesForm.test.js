import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import DatesForm from './DatesForm';

test('renders DatesForm', async() => {
  render(<DatesForm />);
  const inputElement = await screen.queryByLabelText('Start:');
  const inputElementEnd = await screen.queryByLabelText('End:');
  expect(inputElement).toHaveAttribute('value');
  expect(inputElement.id).toEqual('start');
	expect(inputElementEnd).toHaveAttribute('value');
  expect(inputElementEnd.id).toEqual('end');
});

test('change end date', async() => {
	const setEnd = jest.fn();
  render(<DatesForm setEnd={setEnd} />);

	fireEvent.change(screen.queryByLabelText('End:'), { target: { value: '2021-04-07' }});
	await waitFor(() => screen.queryByLabelText('End:')	)
  const inputElementEnd = await screen.queryByLabelText('End:');
	expect(inputElementEnd).toHaveAttribute('value');
  expect(inputElementEnd.id).toEqual('end');
  expect(inputElementEnd.value).toEqual('2021-04-07');
	expect(setEnd).toHaveBeenCalled();
});

test('change start date', async() => {
	const setStart = jest.fn();
  render(<DatesForm setStart={setStart} />);

	fireEvent.change(screen.queryByLabelText('Start:'), { target: { value: '2021-04-07' }});
	await waitFor(() => screen.queryByLabelText('Start:')	)
  const inputElement = await screen.queryByLabelText('Start:');
  expect(inputElement.value).toEqual('2021-04-07');
	expect(setStart).toHaveBeenCalled();
});

test('when start set end limit is correct', async() => {
	const setStart = jest.fn();
	const setEnd = jest.fn();
  render(<DatesForm setStart={setStart} setEnd={setEnd} />);

	fireEvent.change(screen.queryByLabelText('Start:'), { target: { value: '2021-04-07' }});
	await waitFor(() => screen.queryByLabelText('Start:')	)
  const inputElementEnd = await screen.queryByLabelText('End:');
  const inputElement = await screen.queryByLabelText('Start:');
  expect(inputElement.value).toEqual('2021-04-07');
	expect(inputElementEnd.min).toEqual('2021-04-07');
	const endDate = new Date().toJSON().split('T')[0];
	expect(inputElementEnd.max).toEqual(endDate);
});

test('when end set start limit is correct', async() => {
	const setStart = jest.fn();
	const setEnd = jest.fn();
  render(<DatesForm setStart={setStart} setEnd={setEnd} />);

	fireEvent.change(screen.queryByLabelText('Start:'), { target: { value: '2021-04-01' }});
	fireEvent.change(screen.queryByLabelText('End:'), { target: { value: '2021-04-07' }});

  const inputElementEnd = await screen.queryByLabelText('End:');
  const inputElement = await screen.queryByLabelText('Start:');
	const endDate = new Date().toJSON().split('T')[0];
	expect(inputElementEnd.max).toEqual(endDate);
	expect(inputElementEnd.min).toEqual('2021-04-01');
	expect(inputElement.value).toEqual('2021-04-01');
	expect(inputElement.max).toEqual('2021-04-07');
	expect(inputElementEnd.min).toEqual('2021-04-01');
});
