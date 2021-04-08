import { render } from '@testing-library/react';
import Map from './Map';
import mapbox from 'mapbox-gl';

test('map renders', async() => {
	jest.spyOn(window.URL, 'createObjectURL').mockImplementation(() => '');
	jest.spyOn(mapbox, 'Map').mockImplementation(() => {
		return {
			setCenter: () => {},
			setZoom: () => {}
		}
	});

	const map = render(<Map />);
  const mapContainer = map.container.querySelector('#map-container');
	expect(mapContainer).toBeTruthy();
});
