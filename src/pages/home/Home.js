import React, { useEffect, useState, Suspense, lazy} from 'react';
import { useHistory } from 'react-router';
import './Home.scss';
import { getEarthQuakesByDate } from './../../services/api';
import DatesForm from '../../components/dates-form/DatesForm';
import close from './../../assets/close.png';
import expand from './../../assets/expand.png';
import Loading from '../../components/loading/Loading';
const Map = lazy(() => import('./../../components/map/Map'));

function Home() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [load, setLoad] = useState(false);
  const  history = useHistory();

	useEffect(() => {
		async function fetchData() {
			setLoad(true);
			const response = await getEarthQuakesByDate(startDate, endDate);
			setData(response);
			setLoad(false);
		}
	
		if (startDate && endDate) {
			fetchData();
		}
	}, [startDate, endDate]);
	function seeDetail(id) {
		history.push('/detail/' + id);
	}
	return (
    <div className='Home'>
			{load ? <Loading /> : ''}
			<div className={hidden ? 'menu hidden' : 'menu'}>
				<img className='logo' src={hidden ? expand : close} alt='logo' onClick={() => setHidden(!hidden)}/>
				<div className={hidden ? 'date-form hidden' : 'date-form'}>
					<DatesForm setStart={setStartDate} setEnd={setEndDate} />
				</div>
			</div>
			<div className={hidden ? 'map wholewide' : 'map'}>
				<Suspense fallback={<Loading />}>
	      	<Map data={data} isDetailActive={true} resize={hidden} seeDetail={seeDetail} />
				</Suspense>
			</div>
    </div>
  );
}

export default Home;
