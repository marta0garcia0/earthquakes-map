import React, { useRef, useState, useEffect } from 'react';
import './Map.scss';
import mapbox from 'mapbox-gl';
import logo from './../../assets/map-marker-2-256.png';
import redLogo from './../../assets/map-marker-2-256-red.png';
import PopUp from '../popup/PopUp';
import ReactDOM from 'react-dom';
import Loading from '../loading/Loading';
import { MIN_ZOOM, MAX_ZOOM, INIT_COORDINATES } from '../../constants';
mapbox.accessToken = process.env.REACT_APP_MY_ENV;

function Map({data, resize, seeDetail, isDetailActive}) {
	const [load, setLoad] = useState(false);
	const prevMapRef = useRef();
	const prevResizeRef = useRef();
	const prevDataRef = useRef();

	function initializeMap() {
		setLoad(true);
		const map = new mapbox.Map({
			container: 'map-container',
			center: INIT_COORDINATES,
			zoom: 1,
			style: 'mapbox://styles/mapbox/outdoors-v11',
		});
		setLoad(false);
		prevMapRef.current = map;
	}

	function setSources() {
		const map = prevMapRef.current;
		map.addSource('earthquake', {
			'type': 'geojson',
			'data': {
				'type': 'FeatureCollection',
				'features': isDetailActive ? data.features : [data]
			}
		});
	}

	function setMarkerLayer() {
		const map = prevMapRef.current;
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
	}

	function loadImagesSource() {
		const map = prevMapRef.current;
		map.loadImage(logo, (error, image) => {
			map.loadImage(redLogo, (redError, redImage) => {
				if (error) throw error;
				if (redError) throw redError;
				if (!map.hasImage('neutral')) {
					map.addImage('neutral', image);
				}
				if (!map.hasImage('red')) {
					map.addImage('red', redImage);
				}
				if (!map.getSource('earthquake')) {
					setSources();
				} else {
					// remove previous source and set the new one
					map.removeLayer('places')
					map.removeSource('earthquake')
					setSources();
				}
				if (!map.getLayer('places')) {
					setMarkerLayer();
				}
			});
		});
	}

	function setTooltip() {
		const map = prevMapRef.current;
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

	useEffect(() => {
		if (!prevMapRef.current) {
			initializeMap();
		}
		const map = prevMapRef.current;
		// data change side effect
		if (prevResizeRef.current === undefined || prevResizeRef.current === resize) {
			// first data render or data different from previous data
			if (!prevDataRef || !prevDataRef.current ||
				(data && data.metadata && data.metadata.generated !== prevDataRef.current.metadata.generated)) {
				const center = isDetailActive || !data ? INIT_COORDINATES : data.geometry.coordinates;
				map.setCenter(center);
				map.setZoom(isDetailActive || !data ? MIN_ZOOM : MAX_ZOOM);
				if (data) {
					loadImagesSource();
				}
				if (isDetailActive) {
					setTooltip();
				}
			}
		} else {
			// resize side effect
			if (map && map.resize) {
				setTimeout(()=> {
					map.resize();
				}, 100);
			}
		}
		prevDataRef.current = data;
		prevMapRef.current = map;
		prevResizeRef.current = resize;
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
