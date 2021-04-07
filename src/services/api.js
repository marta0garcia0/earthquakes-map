const API_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/';

const getEarthQuakesByDate = (startTime, endTime) =>
  fetch(`${API_URL}query?format=geojson&starttime=${startTime}&endtime=${endTime}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
			return data;
    });

const getEarthQuakeById = (id) =>
	fetch(`${API_URL}query?format=geojson&eventid=${id}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
      return data;
		});

export { getEarthQuakesByDate, getEarthQuakeById };
