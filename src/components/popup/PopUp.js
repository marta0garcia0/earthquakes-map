import React from 'react';

function PopUp({properties, seeDetail}) {
	const firstId = properties.ids.slice(1).split(',')[0];
  return (
		<div id='popup-container'>
			<div>
				<span>ids: {firstId}</span><br></br>
				<span>title: {properties.title}</span><br></br>
				<span>status: {properties.status}</span><br></br>
				<span>place: {properties.place}</span><br></br>
				<button className='primary' onClick={() => seeDetail(firstId)}>See detail</button>
			</div>
		</div>
  );
}

export default PopUp;
