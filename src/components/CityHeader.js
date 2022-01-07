import TimeLocal from "./TimeLocal";
import WeatherTemp from "./WeatherTemp";
import WeatherIcon from "./WeatherIcon";

const CityHeader = ({ city }) => {
    return (
        <div className="city-header">

            <div style={{ width:'auto' }}>{city.name}, {city.country}</div>

            <TimeLocal offset={ city.offset } />

            <WeatherTemp tempCelsius={ city.temp } />

            <WeatherIcon icon={ city.icon } />

        </div>
    )
}

export default CityHeader
