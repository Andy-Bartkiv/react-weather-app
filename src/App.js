import './styles/App.css';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
// import Navbar from './components/Navbar';
// import AppRouter from './components/AppRouter';

function App() {
  return (
    <HashRouter>{/* <BrowserRouter> */}
      <div className="App">

        <Header />

        {/* <Navbar /> */}
          
        {/* <AppRouter /> */}
        
        <h3 className="App-body">App Body</h3>

      </div>
    </HashRouter>
  );
}

export default App;
