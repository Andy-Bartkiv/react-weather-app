import { useContext } from "react";
import { DataContext } from "../context";
import convertCtoF from "../utils/convertCtoF";

const CityMapOverlay = ({ city, zoom, setMapCenter, setZoom }) => {

    const { isCelsius } = useContext(DataContext);

    const cityTemp = (isCelsius) ? city.temp : convertCtoF(city.temp);
    const temp = ((cityTemp  > 0) ? '+' : '-') 
        + ` ${Math.round(Math.abs(cityTemp))} \u00b0${isCelsius?"C":"F"}`;
    const fontSize = `max(.5em, ${1 - 1.5/zoom}em)`;

    return (
        <div style={{ 
            fontSize, fontWeight:'900', color:'#282c44', background:'#0888', cursor:'pointer',
            borderRadius:'.5em', display:'flex', alignItems:'center', padding:'.25em', gap:'.5em'}}
            onClick={ () => {
                setMapCenter([city.coord.lat, city.coord.lon]);
                setZoom((zoom <= 5) ? zoom+1 : zoom-1);
            }} 
        >
            <div>{city.name}</div>
            { city.icon &&
                <img 
                    style={{ height: '1em', transform: 'scale(2)' }}
                    src={`https://openweathermap.org/img/w/${city.icon}.png`} 
                    alt={`${city.weather}`}
                />
            }
            <div>{city.temp && temp}</div>
        </div>
    )
}

export default CityMapOverlay
