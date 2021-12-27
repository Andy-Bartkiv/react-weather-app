import WeatherService from "../API/WeatherService";
import processWeatherData from "../utils/processWeatherData";
import CityItem from "./CityItem";
import { useContext, useState } from "react";
import { DataContext } from "../context";

const CitiesList = ({ cities, setCities }) => {

    const {setCoord} = useContext(DataContext);

    const [delID, setDelID] = useState(null);
    const [activeID, setActiveID] = useState(null);

    function deleteCity(cityID, event) {
        event.stopPropagation();
        setDelID(cityID);
        setTimeout( () =>
            setCities(cities.filter( city => city.id !== cityID))
        , 500); // timeout for animation
    }

    // async ??????
    async function toggleActive(cityID) {
        const activeCity = (activeID !== cityID)
            ? cityID
            : null
        setActiveID(activeCity);
        if (activeCity) {
            const city = cities.find(city => city.id === cityID);
            let cityName = city.name;
            if (city.country) 
                cityName += `,` + city.country;
            console.log(cityName);
            const resp = await WeatherService.getForecast(cityName);
            console.log(resp.data);
            setCoord([resp.data.city.coord.lat, resp.data.city.coord.lon])
        }
    }

    async function getWeather(cityID, event) {
        event.stopPropagation();

        const city = cities.find(city => city.id === cityID);
        let cityName = city.name;
        if (city.country) 
            cityName += `,` + city.country;
        const resp = await WeatherService.getWeather(cityName);
        console.log(resp.data);
    
        const cityData = processWeatherData(resp);
        const newCities = [...cities].map(city => 
          (city.id === cityID) ? {...city, ...cityData} : city 
        )
        setCities(newCities);
        console.table(newCities)
        // navigator.geolocation.getCurrentPosition((pos) => console.log(pos))
      }

    return (
        <div className="city-list">
            { cities.map( (city) => {
                const clsActive = (activeID === city.id)  ? ' active' : '';
                const clsDel = (delID === city.id) ? ' delete' : '';
                return (
                    <div 
                        key={ city.id } 
                        className={ `city` + clsActive + clsDel } 
                        onClick={ () => toggleActive(city.id) }>    
                            <CityItem city={ city } deleteCity={ deleteCity } getWeather={ getWeather } />
                    </div>)
                }
            )}
        </div>
    )
}

export default CitiesList;
