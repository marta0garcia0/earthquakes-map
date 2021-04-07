import './Loading.scss';
import loading from './../../assets/loading.gif';

function Loading() {
  return (
		<div className='loading'>
			<img src={loading} alt='loading' />
		</div>
  );
}

export default Loading;
