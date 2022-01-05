import TimeLocal from "./TimeLocal";
import MyButton from "./UI/button/MyButton";
import WeatherTemp from "./WeatherTemp";
import WeatherIcon from "./WeatherIcon";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context";
import { MdOutlineMap, MdOutlineLanguage, MdDeleteForever } from 'react-icons/md'
import { FaCloudSunRain } from 'react-icons/fa'


const CityItem = ({ city, deleteCity, getWeather }) => {

    const { is3D, activeCity, setActiveCity } = useContext(DataContext);

    const forecast = ['Mon, Jan 3','Tue, Jan 4','Wed, Jan 5','Thu, Jan 6','Fri, Jan 7'];

    function nth(n) {
        return n + ["th", "st", "nd", "rd"][n % 100 > 10 && n % 100 < 14 || n % 10 > 3 ? 0 : n % 10]
    }

    return (
        <div className="city-item">
            <div className="city-header">

                <div className="city_btns">
                <Link style={{ textDecoration:'none' }} to={ '/map' }>
                    <MyButton 
                        style={{ borderColor: 'transparent', padding: '0' }} 
                        onClick={ (e) => { 
                            e.stopPropagation(); 
                            setActiveCity(city); 
                        }}>
                        { (is3D) 
                            ? <MdOutlineLanguage style={{ height: '1.75em', width: '1.75em' }}/> 
                            : <MdOutlineMap style={{ height: '1.75em', width: '1.75em' }}/> }
                    </MyButton>
                </Link>
                </div>

                <div style={{ width:'auto' }}>{city.name}, {city.country}</div>

                <TimeLocal offset={ city.offset } />

                <WeatherTemp tempCelsius={ city.temp } />

                <WeatherIcon icon={ city.icon } />

                <div className="city_btns">
                    <MyButton 
                        onClick={ (event) => getWeather(city.id, event) } 
                        style={{ borderColor: 'transparent', padding: '0' }}>
                        <FaCloudSunRain style={{ height: '1.75em', width: '1.75em' }}/>
                        </MyButton>

                    <MyButton 
                        onClick={ (event) => deleteCity(city.id, event) } 
                        style={{ borderColor: 'transparent', padding: '0' }}>
                        <MdDeleteForever style={{ height: '1.75em', width: '1.75em' }}/>
                    </MyButton>
                </div>
            </div>
            
            <div className="city-body">
{/* <hr/> */}   
                <div className="city-data-major"> 
                    {city.name}, {city.country}
                    <br />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                    <br />
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    {nth(3)}
                    <TimeLocal />
                    <WeatherTemp tempCelsius={ city.temp }/>
                    { city.weather }

                </div>
                <div className="city-data-minor"> hum, wind </div>
                <div className="city-forecast">
                    { forecast.map( (day, i) => 
                        <div className="forecast-day" key={i}>
                            <div className="forecast-day-title">{ day }</div>
                            <WeatherIcon icon={ city.icon }/>
                            <WeatherIcon icon={ city.icon }/>
                            <WeatherTemp tempCelsius={ city.temp } size=".75em"/>
                            <WeatherTemp tempCelsius={ city.temp } size=".75em"/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CityItem
