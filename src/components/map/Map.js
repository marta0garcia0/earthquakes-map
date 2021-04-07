import React, { useRef, useState, useEffect } from 'react';
import './Map.scss';
import mapbox from 'mapbox-gl';
import logo from './../../assets/map-marker-2-256.png';
import redLogo from './../../assets/map-marker-2-256-red.png';
import PopUp from '../popup/PopUp';
import ReactDOM from 'react-dom';
import Loading from '../loading/Loading';

function Map({data, resize, seeDetail, isDetailActive}) {
	const [load, setLoad] = useState(false);
	const prevDataRef = useRef();

	useEffect(() => {
		let map;
		// do not recalculate data when resizing
		if (prevDataRef.current === resize) {
			setLoad(true);
			mapbox.accessToken = process.env.REACT_APP_MY_ENV;
			const center = isDetailActive || !data ? [0, 0] : data.geometry.coordinates;
			map = new mapbox.Map({
				container: 'map-container',
				center,
				zoom: isDetailActive ? 1 : 5,
				style: 'mapbox://styles/mapbox/outdoors-v11',
			});
			if (data) {
				map.on('load', function () {
					map.loadImage(logo, (error, image) => {
						map.loadImage(redLogo, (redError, redImage) => {
						if (error) throw error;
						if (redError) throw redError;
						map.addImage('neutral', image);
						map.addImage('red', redImage);
						map.addSource('earthquake', {
							'type': 'geojson',
							'data': {
								'type': 'FeatureCollection',
								'features': isDetailActive ? data.features : [data]
							}
						});
						map.addLayer({
							'id': 'places',
							'type': 'symbol',
							'source': 'earthquake',
							'layout': {
								'icon-size': 0.15,
								'icon-image': [
									'match',
									['get', 'status'],
									'reviewed',
										'neutral',
									'automatic',
										'red',
									'neutral'
									],
							},
							'filter': ['==', '$type', 'Point']
						});
						setLoad(false);
						if (isDetailActive) {
							map.on('click', 'places', function (e) {
								let coordinates = e.features[0].geometry.coordinates.slice();
								while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
									coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
									}
									const mapCardNode = document.createElement("div");
									ReactDOM.render(<PopUp properties={e.features[0].properties} seeDetail={seeDetail} /> ,
										mapCardNode
									);
								new mapbox.Popup()
									.setLngLat(coordinates)
									.setDOMContent(mapCardNode)
									.addTo(map);
								});
								// Change the cursor to a pointer when the mouse is over the places layer.
								map.on('mouseenter', 'places', function () {
									map.getCanvas().style.cursor = 'pointer';
								});
								// Change it back to a pointer when it leaves.
								map.on('mouseleave', 'places', function () {
									map.getCanvas().style.cursor = '';
								});
							}
						});
					});
				});
			} else {
				setLoad(false);
			}
		} else {
			if (map && map.resize) {
				map.resize();
			}
		}
		prevDataRef.current = resize;
	}, [data, resize, isDetailActive, seeDetail]);
	
	return (
		<>
			{load ? <Loading /> : ''}
			<div id='map-container'>
			</div>
		</>
  );
}

export default Map;
