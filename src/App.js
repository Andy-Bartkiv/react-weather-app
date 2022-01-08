import './styles/App.css';
import FIVE_CITIES from './data/fiveCities';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataContext } from './context';
import Header from './components/Header';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';

function App() {
   
  const [fiveCities, setFiveCities] = useState(FIVE_CITIES);
  const userData = JSON.parse(localStorage.getItem('WeatherApp.MyCities'));  
  const [myCities, setMyCities] = useState( (userData) ? userData : [] );
  const [min, setMin] = useState(null);
  const [is3D, setIs3D] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  const [activeCity, setActiveCity] = useState(FIVE_CITIES[0]);
  const [first, setFirst] = useState(true);
  const [apiReq, setApiReq] = useState(0);

  useEffect( () => {
    localStorage.setItem('WeatherApp.MyCities', JSON.stringify(myCities));
  }, [myCities])

  return (
    <DataContext.Provider value={{ 
      fiveCities, setFiveCities,// initial 5 cities list
      myCities, setMyCities,    // custom added cities list
      min, setMin,              // minutes for local time sync
      activeCity, setActiveCity,// active City
      is3D, setIs3D,            // 3D-Globe or 2D-Map selector 
      isCelsius, setIsCelsius,  // Celsius or Fahrenheit grad selector
      first, setFirst,          // first time App starts to make Protaras active city
      apiReq, setApiReq         // count limits for api call per minute
    }}>
    <HashRouter>
    {/* <BrowserRouter> */}
      <div className="App">

        <Header />

        <Navbar />
          
        <AppRouter />
        
      </div>
    {/* <BrowserRouter> */}
    </HashRouter>
    </DataContext.Provider>
  );
}

export default App;
