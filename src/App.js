import './styles/App.css';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import { useState } from 'react';
import NewCityForm from './components/NewCityForm';
import CitiesList from './components/CitiesList';
// import Navbar from './components/Navbar';
// import AppRouter from './components/AppRouter';

function App() {

  const [cities, setCities] = useState([
    {id: '1', name: 'Amsterdam'},
    {id: '2', name: 'Berlin'},
    {id: '3', name: 'London'}
  ]);

  function deleteCity(cityID) {
    setCities(cities.filter( city => city.id !== cityID))
  }

  return (
    // <HashRouter>{/* <BrowserRouter> */}
      <div className="App">

        <Header />

        {/* <Navbar /> */}
          
        {/* <AppRouter /> */}
        
        <div className="App-body">
          <NewCityForm addCity = { (newCity) => setCities([...cities, newCity]) }/>

          <CitiesList 
            cities = { cities }
            deleteCity = { deleteCity }
          />          
        </div>

      </div>
    // </HashRouter>
  );
}

export default App;
