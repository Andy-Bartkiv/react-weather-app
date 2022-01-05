import { useContext } from "react";
import { DataContext } from "../context";
import convertCtoF from "../utils/convertCtoF";

const WeatherTemp = ({ tempCelsius, size='1em' }) => {
    const { isCelsius } = useContext(DataContext);
    const cityTemp = (isCelsius) ? tempCelsius : convertCtoF(tempCelsius);
    const temp = ((cityTemp > 0) ? '+' : '-') 
        + ` ${Math.round(Math.abs(cityTemp))} \u00b0${isCelsius?"C":"F"}`;

    return (
        <div style={{ fontSize: size }}>
            { tempCelsius && temp }
        </div>
    )
}

export default WeatherTemp
