import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.scss';
import logo from './assets/globe-7-256.png';
import Detail from './pages/detail/Detail';
import Home from './pages/home/Home';

function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <a className='App-link' href='/'>
          <img src={logo} className='App-logo' alt='logo' />
          Earthquakes map
        </a>
      </div>
      <Router>
          <Switch>
            <Route path='/detail/:earthquakeId'>
              <Detail />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
