import './styles/App.css';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import { useState } from 'react';
import NewCityForm from './components/NewCityForm';
import CitiesList from './components/CitiesList';
// import Navbar from './components/Navbar';
// import AppRouter from './components/AppRouter';
import WeatherService from "./API/WeatherService"

function App() {

  const [cities, setCities] = useState([
    {id: '1', name: 'Amsterdam'},
    {id: '2', name: 'Berlin'},
    {id: '3', name: 'London'},
    {id: '4', name: 'Moscow'}
  ]);

  async function getWeather(cityId, event) {
    event.stopPropagation();
    const cityName = cities.find(city => city.id === cityId).name;
    const resp = await WeatherService.getCityByName(cityName);
    console.log(resp.data);
    const offset = resp.data.timezone;
    const time = new Date(Date.now() + (offset*1000));

    const cityData = {
      country: resp.data.sys.country,
      time: time.toLocaleTimeString('en-GB', {timeZone: "UTC", hour: '2-digit', minute: '2-digit'}),
      temp: resp.data.main.temp,
      weather: resp.data.weather[0].main
    }
    const newCities = [...cities].map(city => 
      (city.id === cityId) ? {...city, ...cityData} : city 
    )
    setCities(newCities);
    console.table(newCities)
    // navigator.geolocation.getCurrentPosition((pos) => console.log(pos))
  }

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
            getWeather = { getWeather }
          />          
        </div>

      </div>
    // </HashRouter>
  );
}

export default App;
