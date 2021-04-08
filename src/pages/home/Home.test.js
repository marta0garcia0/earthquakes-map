import { render, act, screen } from '@testing-library/react';
import mapbox from 'mapbox-gl';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import * as api from './../../services/api';
import Home from './Home';

test('home render', async() => {
	jest.spyOn(mapbox, 'Map').mockImplementation(() => {
		return {
			setCenter: () => {},
			setZoom: () => {},
			loadImage: () => {},
			on: () => {}
		}
	});
	jest.spyOn(api, 'getEarthQuakeById').mockImplementation(() => Promise.resolve(
		{"type":"Feature","properties":{"mag":2.35,"place":"4 km SE of Maria Antonia, Puerto Rico","time":1617810018030,"updated":1617811032381,"tz":null,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/pr2021097004","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"reviewed","tsunami":0,"sig":85,"net":"pr","code":"2021097004","ids":",pr2021097004,","sources":",pr,","types":",origin,phase-data,","nst":16,"dmin":0.1826,"rms":0.17,"gap":207,"magType":"md","type":"earthquake","title":"M 2.4 - 4 km SE of Maria Antonia, Puerto Rico","products":{"origin":[{"indexid":"227831191","indexTime":1617811035950,"id":"urn:usgs-product:pr:origin:2021097004:1617811032381","type":"origin","code":"2021097004","source":"pr","updateTime":1617811032381,"status":"UPDATE","properties":{"azimuthal-gap":"207","depth":"10","depth-type":"from location","evaluation-status":"preliminary","event-type":"earthquake","eventParametersPublicID":"quakeml:pr.anss.org/event/2021097004/1617811032427","eventsource":"pr","eventsourcecode":"2021097004","eventtime":"2021-04-07T15:40:18.030Z","horizontal-error":"0.67","latitude":"17.9518","longitude":"-66.8625","magnitude":"2.35","magnitude-error":"0.04","magnitude-num-stations-used":"4","magnitude-type":"md","minimum-distance":"0.1826","num-phases-used":"32","num-stations-used":"16","pdl-client-version":"Version 1.11.0 2017-01-11","quakeml-magnitude-publicid":"quakeml:pr.anss.org/magnitude/2021097004/Md","quakeml-origin-publicid":"quakeml:pr.anss.org/origin/2021097004","quakeml-publicid":"quakeml:pr.ans.gov/event/2021097004","review-status":"reviewed","standard-error":"0.17","title":"4 km SE of Maria Antonia, Puerto Rico","vertical-error":"0.6"},"preferredWeight":157,"contents":{"contents.xml":{"contentType":"application/xml","lastModified":1617811034000,"length":195,"url":"https://earthquake.usgs.gov/archive/product/origin/2021097004/pr/1617811032381/contents.xml"},"quakeml.xml":{"contentType":"application/xml","lastModified":1617811032000,"length":1910,"url":"https://earthquake.usgs.gov/archive/product/origin/2021097004/pr/1617811032381/quakeml.xml"}}}],"phase-data":[{"indexid":"227831201","indexTime":1617811037596,"id":"urn:usgs-product:pr:phase-data:2021097004:1617811032381","type":"phase-data","code":"2021097004","source":"pr","updateTime":1617811032381,"status":"UPDATE","properties":{"azimuthal-gap":"207","depth":"10","depth-type":"from location","evaluation-status":"preliminary","event-type":"earthquake","eventParametersPublicID":"quakeml:pr.anss.org/event/2021097004/1617811032427","eventsource":"pr","eventsourcecode":"2021097004","eventtime":"2021-04-07T15:40:18.030Z","horizontal-error":"0.67","latitude":"17.9518","longitude":"-66.8625","magnitude":"2.35","magnitude-error":"0.04","magnitude-num-stations-used":"4","magnitude-type":"md","minimum-distance":"0.1826","num-phases-used":"32","num-stations-used":"16","pdl-client-version":"Version 1.11.0 2017-01-11","quakeml-magnitude-publicid":"quakeml:pr.anss.org/magnitude/2021097004/Md","quakeml-origin-publicid":"quakeml:pr.anss.org/origin/2021097004","quakeml-publicid":"quakeml:pr.ans.gov/event/2021097004","review-status":"reviewed","standard-error":"0.17","vertical-error":"0.6"},"preferredWeight":157,"contents":{"contents.xml":{"contentType":"application/xml","lastModified":1617811034000,"length":195,"url":"https://earthquake.usgs.gov/archive/product/phase-data/2021097004/pr/1617811032381/contents.xml"},"quakeml.xml":{"contentType":"application/xml","lastModified":1617811032000,"length":66329,"url":"https://earthquake.usgs.gov/archive/product/phase-data/2021097004/pr/1617811032381/quakeml.xml"}}}]}},"geometry":{"type":"Point","coordinates":[-66.8625,17.9518,10]},"id":"pr2021097004"}
	));

	const history = createMemoryHistory();
	let home;
	await act(async () => {
		home = render(
			<Router history={history}>
				<Home />
			</Router>
		);
	});

 	const container = home.container.querySelector('.Home');
	const menu = home.container.querySelector('.menu');
	const map = home.container.querySelector('.map');
	expect(menu).toBeTruthy();
	expect(map).toBeTruthy();
});
