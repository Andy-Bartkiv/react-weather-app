import './styles/App.css';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { DataContext } from './context';
import WeatherService from "./API/WeatherService";
import Header from './components/Header';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';

function App() {
  
  const [myCities, setMyCities] = useState([]);
  const [fiveCities, setFiveCities] = useState([
    {id: '1', name: 'Protaras'},
    {id: '2', name: 'Beijing'},
    {id: '3', name: 'London'},
    {id: '4', name: 'Moscow'},
    {id: '5', name: 'New York'},
  ]);

  return (
    <DataContext.Provider value={{ fiveCities, setFiveCities, myCities, setMyCities }}>
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
