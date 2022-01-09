import WeatherIcon from "./WeatherIcon";
import WeatherTemp from "./WeatherTemp";
import forecastToDisplay from "../utils/forecastToDisplay";

const ForecastDay = ({ i, city }) => {
    
    const dataForecast = forecastToDisplay(i, city);

    return (
        <div className="forecast-day">
            <div className="forecast-day-title">
                { dataForecast.title }
            </div>
            
            <WeatherIcon icon={ dataForecast.icons[0] }/>
            <WeatherIcon icon={ dataForecast.icons[1] }/>
            
            <WeatherTemp tempCelsius={ dataForecast.temps[0] } size=".85em"/>
            <WeatherTemp tempCelsius={ dataForecast.temps[1] } size=".85em"/>
        </div>
    )
}

export default ForecastDay
