import { Route, Routes, Navigate } from "react-router-dom";
import Default from "../pages/Default";
import MyList from "../pages/MyList";

const AppRouter = () => {

    return (
        <Routes className='App-body'>
            <Route path="/default" element = { <Default /> }/>
            <Route path="/my-list" element = { <MyList /> }/>
            <Route path="/*" element = { <Navigate replace to="/default" /> }/>
        </Routes>
    )
}

export default AppRouter
