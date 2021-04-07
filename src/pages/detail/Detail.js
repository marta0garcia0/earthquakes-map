import React, { useEffect, useState, Suspense, lazy} from 'react';
import { useParams } from 'react-router-dom';
import './Detail.scss';
import { getEarthQuakeById } from './../../services/api';
import { useHistory } from 'react-router';
import Loading from '../../components/loading/Loading';
const Map = lazy(() => import('./../../components/map/Map'));

function Detail() {
  const [data, setData] = useState(null);
  const { earthquakeId } = useParams();
  const  history = useHistory();
	useEffect(() => {
		const goHome = () => {
			history.push('/');
		};
		async function fetchData() {
			try {
				const response = await getEarthQuakeById(earthquakeId);
				if (!response) goHome();
				setData(response);
			} catch (e) {
				goHome();
			}
		}
		fetchData();
	}, [earthquakeId, history]);

	return (
    <div className='Detail'>
			<div className='detail-map'>
				<Suspense fallback={<Loading />}>
					<Map data={data} isDetailActive={false} />
				</Suspense>
			</div>
			<div className='detail-info'>
				{data && data.properties ?
					<ul>
						<li><b>Earthquake ID:</b> {earthquakeId}</li>
						<li><b>Location:</b> {data.properties.place}</li>
						<li><b>Title:</b> {data.properties.title}</li>
						<li><b>Date:</b> {new Date(data.properties.time).toLocaleString()}</li>
						<li><b>Updated:</b> {new Date(data.properties.updated).toLocaleString()}</li>
						<li><b>Type:</b> {data.properties.mag}</li>
						<li><b>Magnitude:</b> {data.properties.status}</li>
						<li><b>State:</b> {data.properties.types.slice(1, data.properties.types.length -1)}</li>
					</ul>
				: <Loading />}
			</div>
    </div>
  );
}

export default Detail;
