import { API_URL } from './../constants';

const getEarthQuakesByDate = (startTime, endTime) =>
  fetch(`${API_URL}query?format=geojson&starttime=${startTime}&endtime=${endTime}`)
    .then((response) => {
			if (response.ok) return response.json();
			return response;
    })
    .then((data) => {
			return data;
    })
		.catch((error) => {
			return error;
		});

const getEarthQuakeById = (id) =>
	fetch(`${API_URL}query?format=geojson&eventid=${id}`)
		.then((response) => {
			if (response.ok) return response.json();
			return response;
		})
		.then((data) => {
      return data;
		})
		.catch((error) => {
			return error;
		});

export { getEarthQuakesByDate, getEarthQuakeById };
