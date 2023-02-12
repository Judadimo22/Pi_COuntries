import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
// import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home';
import CountryDetail from './components/CountryDetail/CountryDetail';
import CreateActivity from './components/CreateActivity/CreateActivity';



function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route exact path= '/home' component={Home}/>
        <Route exact path= '/detail/:id' component={CountryDetail}/>
        <Route exact path='/createactivity' component={CreateActivity}/>
      </Switch>
    </div>
    </BrowserRouter>

  );
}

export default App;
