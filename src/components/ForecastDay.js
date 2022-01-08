import WeatherIcon from "./WeatherIcon";
import WeatherTemp from "./WeatherTemp";

const ForecastDay = ({ i, city }) => {
    return (
        <div className="forecast-day">
            <div className="forecast-day-title">
                {city.forecast[i*8+3].dt_txt.slice(11,13) }, {city.forecast[i*8+7].dt_txt.slice(11,13) }
            </div>
            
            <WeatherIcon icon={ city.forecast[i*8+3].weather[0].icon }/>
            <WeatherIcon icon={ city.forecast[i*8+7].weather[0].icon }/>
            
            <WeatherTemp tempCelsius={ city.forecast[i*8+3].main.temp} size=".85em"/>
            <WeatherTemp tempCelsius={ city.forecast[i*8+7].main.temp } size=".85em"/>
        </div>
    )
}

export default ForecastDay
