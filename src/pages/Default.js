import CitiesList from "../components/CitiesList";
import { useContext } from "react";
import { DataContext } from "../context";


const Default = () => {
  
    const { fiveCities, setFiveCities } = useContext(DataContext);

    return (
        <div className="App-body">

          <CitiesList cities={ fiveCities } setCities={ setFiveCities }/>

        </div>
    )
}

export default Default
