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
  const [myCities, setMyCities] = useState( 
    (userData.length > 0) ? userData : [] );

  const [min, setMin] = useState(null);
  const [is3D, setIs3D] = useState(true)
  const [coord, setCoord] = useState([ 51.51, -0.13 ])

  useEffect( () => {
    localStorage.setItem('WeatherApp.MyCities', JSON.stringify(myCities));
    const res = localStorage.getItem('WeatherApp.MyCities');
    // console.table(JSON.parse(res));
  }, [myCities])

  return (
    <DataContext.Provider value={{ 
      fiveCities, setFiveCities, 
      myCities, setMyCities, 
      min, setMin,
      coord, setCoord,
      is3D, setIs3D,
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
