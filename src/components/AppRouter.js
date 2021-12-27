import { Route, Routes, Navigate } from "react-router-dom";
import Default from "../pages/Default";
import MyList from "../pages/MyList";
import Map from "../pages/Map";

const AppRouter = () => {

    return (
        <Routes className='App-body'>
            <Route path="/five-cities" element = { <Default /> }/>
            <Route path="/my-list" element = { <MyList /> }/>
            <Route path="/map" element = { <Map /> }/>
            <Route path="/*" element = { <Navigate replace to="/five-cities" /> }/>
        </Routes>
    )
}

export default AppRouter
