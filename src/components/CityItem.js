import TimeLocal from "./TimeLocal";
import MyButton from "./UI/button/MyButton";

const CityItem = ({ city, deleteCity, getWeather }) => {
    const temp = ((city.temp > 0) ? '+' : '-') + ` ${Math.round(Math.abs(city.temp))} \u00b0C`;
    const forecast = [1,2,3,4,5]

    return (
        <div className="city-item">
            <div className="city-header">
                <div style={{ width:'auto' }}>{city.name}, {city.country}</div>
                <TimeLocal offset={ city.offset } />
                <div>{city.temp && temp}</div>
                {/* <div>{city.weather}</div> */}
                { city.icon &&
                    <img src={`http://openweathermap.org/img/w/${city.icon}.png`} alt={`${city.weather}`}/>
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
            <hr/>
            <div className="city-body">
                { forecast.map(day => 
                    <div className="forecast-day">
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
