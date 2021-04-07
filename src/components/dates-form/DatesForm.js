import React, { useEffect, useState } from 'react';
import './DatesForm.scss';

function DatesForm({setEnd, setStart}) {
	const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
	useEffect(() => {
		if (endDate) {
			setEnd(endDate);
		}
		if (startDate) {
			setStart(startDate);
		}
	}, [startDate, endDate, setEnd, setStart]);

  return (
		<div className='dates-form__container'>
			<div>
				<label htmlFor='fname'>Start:</label>
				<input type='date' id='fname' name='fname'
					value={startDate}
					max={endDate || new Date().toJSON().split('T')[0]}
					onChange={(e) => setStartDate(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='lname'>End:</label>
				<input type='date' id='lname' name='lname'
					value={endDate}
					max={new Date().toJSON().split('T')[0]}
					min={startDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
			</div>
		</div>
  );
}

export default DatesForm;
