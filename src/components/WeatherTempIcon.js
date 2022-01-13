import { useContext } from "react";
import { DataContext } from "../context";
import convertCtoF from "../utils/convertCtoF";
import { BsThermometerSnow, BsThermometerSun } from 'react-icons/bs'
import Loader from "./UI/loader/Loader";

const WeatherTempIcon = ({ tempCelsius }) => {
    const { isCelsius } = useContext(DataContext);
    const cityTemp = (isCelsius) ? tempCelsius : convertCtoF(tempCelsius);
    const temp = ((cityTemp > 0) ? ' +' : ' -') 
        + `${Math.round(Math.abs(cityTemp))} \u00b0${isCelsius?"C":"F"}`;

    return (
        <div style={{ display: 'flex', marginLeft:'.1em' }}>
            { (tempCelsius > 0) ? <BsThermometerSun /> : <BsThermometerSnow /> }
            { tempCelsius ? temp : <Loader/>}
        </div>
    )
}

export default WeatherTempIcon
