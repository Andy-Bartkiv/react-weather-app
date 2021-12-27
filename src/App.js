import './styles/App.css';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataContext } from './context';
import WeatherService from "./API/WeatherService";
import Header from './components/Header';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';

function App() {

  const userData = JSON.parse(localStorage.getItem('WeatherApp.MyCities'));  
  const [myCities, setMyCities] = useState( (userData.length > 0)
    ? userData 
    : []);
  
    const [fiveCities, setFiveCities] = useState([
    {id: '1', name: 'Protaras'},
    {id: '2', name: 'Beijing'},
    {id: '3', name: 'London'},
    {id: '4', name: 'Moscow'},
    {id: '5', name: 'New York'},
  ]);

  const [coord, setCoord] = useState([ 51.51, -0.13 ])

  useEffect( () => {
    localStorage.setItem('WeatherApp.MyCities', JSON.stringify(myCities));
    const res = localStorage.getItem('WeatherApp.MyCities');
    console.table(JSON.parse(res));
  }, [myCities])

  return (
    <DataContext.Provider value={{ 
      fiveCities, setFiveCities, 
      myCities, setMyCities, 
      coord, setCoord 
    }}>
    <HashRouter>{/* <BrowserRouter> */}
      <div className="App">

        <Header />

        <Navbar />
          
        <AppRouter />
        
      </div>
    </HashRouter>
    </DataContext.Provider>
  );
}

export default App;
