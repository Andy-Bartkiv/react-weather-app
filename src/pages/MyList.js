import NewCityForm from "../components/NewCityForm";
import CitiesList from "../components/CitiesList";
import { useContext } from "react";
import { DataContext } from "../context";

const MyList = () => {

    const { myCities, setMyCities } = useContext(DataContext);

    return (
        <div className="App-body">

            <NewCityForm cities={ myCities } setCities={ setMyCities }/>

            <hr />

            <h3>My List</h3>

            <CitiesList cities={ myCities } setCities={ setMyCities }/>

        </div>
    )
}

export default MyList;
