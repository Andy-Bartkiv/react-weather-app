import TimeLocal from "./TimeLocal";
import MyButton from "./UI/button/MyButton";
import { Link } from "react-router-dom";
import convertCtoF from "../utils/convertCtoF";
import { useContext } from "react";
import { DataContext } from "../context";
import { MdOutlineMap, MdOutlineLanguage} from 'react-icons/md'

const CityItem = ({ city, deleteCity, getWeather }) => {

    const { isCelsius, is3D } = useContext(DataContext);

    const cityTemp = (isCelsius) ? city.temp : convertCtoF(city.temp);
    const temp = ((cityTemp > 0) ? '+' : '-') 
        + ` ${Math.round(Math.abs(cityTemp))} \u00b0${isCelsius?"C":"F"}`;
    const forecast = [1,2,3,4,5];

    return (
        <div className="city-item">
            <div className="city-header">

                <div className="city_btns">
                <Link style={{ textDecoration:'none', color: 'teal' }} to={ '/map' }>
                    <MyButton style={{ borderColor: 'transparent', padding: '0' }}>
                        { (is3D) 
                            ? <MdOutlineLanguage style={{ height: '1.75em', width: '1.75em' }}/> 
                            : <MdOutlineMap style={{ height: '1.75em', width: '1.75em' }}/> }
                    </MyButton>
                </Link>
                </div>

                <div style={{ width:'auto' }}>{city.name}, {city.country}</div>

                <TimeLocal offset={ city.offset } />

                <div>{city.temp && temp}</div>
                { city.icon &&
                    <img src={`https://openweathermap.org/img/w/${city.icon}.png`} alt={`${city.weather}`}/>
                }

                <div className="city_btns">
                    <MyButton 
                        onClick={ (event) => getWeather(city.id, event) } 
                        style={{ padding: '.25em .5em' }}>
                        W
                    </MyButton>
                    <MyButton 
                        onClick={ (event) => deleteCity(city.id, event) } 
                        style={{ padding: '.25em .5em' }}>
                        X
                    </MyButton>
                </div>
            </div>
            <div className="city-body">
                <hr/>
                { forecast.map((day, i) => 
                    <div className="forecast-day" key={i}>
                        {day}
                        <div>{city.time}</div>
                        <div>{city.temp && temp}</div>
                        { city.icon &&
                            <img src={`http://openweathermap.org/img/w/${city.icon}.png`} alt={`${city.weather}`}/>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default CityItem
