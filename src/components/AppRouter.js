import { Route, Routes, Navigate } from "react-router-dom";
import Map from "../pages/Map";
import FiveCities from "../pages/FiveCities";
import MyList from "../pages/MyList";

const AppRouter = () => {

    return (
        <Routes className='App-body'>
            <Route path="/five-cities" element = { <FiveCities /> }/>
            <Route path="/my-list" element = { <MyList /> }/>
            <Route path="/map" element = { <Map /> }/>
            <Route path="/*" element = { <Navigate replace to="/five-cities" /> }/>
        </Routes>
    )
}

export default AppRouter
