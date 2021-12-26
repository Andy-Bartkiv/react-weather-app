import MyButton from "./UI/button/MyButton";
import CityItem from "./CityItem";
import { useState } from "react";
import WeatherService from "../API/WeatherService";
import processData from "../utils/processData";

const CitiesList = ({ cities, setCities }) => {

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
            const cityName = cities.find(city => cityID === city.id).name;
            console.log(cityName);
            const resp = await WeatherService.getForecastByName(cityName);
            console.log(resp.data);
        }
    }

    async function getWeather(cityId, event) {
        event.stopPropagation();
        
        const cityName = cities.find(city => city.id === cityId).name;
        const resp = await WeatherService.getCityByName(cityName);
        console.log(resp.data);
    
        const cityData = processData(resp);
        const newCities = [...cities].map(city => 
          (city.id === cityId) ? {...city, ...cityData} : city 
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
                            <CityItem city={ city } />
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
                    </div>)
                }
            )}
        </div>
    )
}

export default CitiesList;
