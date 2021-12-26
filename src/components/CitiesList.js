import MyButton from "./UI/button/MyButton";
import CityItem from "./CityItem";
import { useState } from "react";

const CitiesList = ({ cities, deleteCity, getWeather }) => {

    const [delID, setDelID] = useState(null);
    const [activeID, setActiveID] = useState(null);

    function deleteCity(cityID, event) {
        event.stopPropagation();
        setDelID(cityID);
        setTimeout( () =>
            deleteCity(cityID, event)
        , 500); // timeout for animation
    }

    function toggleActive(cityID) {
        const activeCity = (activeID !== cityID)
            ? cityID
            : null
        setActiveID(activeCity);
    }

    return (
        <div className="city-list">

            <hr />

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

export default CitiesList
