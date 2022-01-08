import TimeLocal from "./TimeLocal";
import WeatherIcon from "./WeatherIcon";
import nth from "../utils/nth"
import WeatherWind from "./WeatherWind";
import WeatherPressure from "./WeatherPressure";
import WeatherHumidity from "./WeatherHumidity";
import WeatherTempIcon from "./WeatherTempIcon";
import ForecastDay from "./ForecastDay";
import Loader from "./UI/loader/Loader";

const CityBody = ({ city }) => {
    const currentTime = new Date(Date.now() + (city.offset*1000));
    console.log(city.name, city.offset)
    console.log(currentTime.getUTCDate())
    console.log(new Date().toLocaleString())
    
    return (
        <div className="city-body">

            <div className="city-data-major"> 
                <div style={{ gridColumn:'1/3', padding: '0 0 .25em 1.5em', margin:'0 auto'}}>
                    {city.name}, {city.country}
                </div>
                <div style={{ fontSize:'.9em' }}>
                    <WeatherTempIcon tempCelsius={ city.temp }/>
                </div>
                <div style={{ fontSize:'.9em' }}>
                    <WeatherHumidity hum={ city.humidity }/>
                </div>
                <div style={{ gridRow:'2/span 2', gridColumn:'2/3', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <WeatherIcon icon={ city.icon } />
                </div>
                <div style={{ gridColumn:'1/3', fontSize:'.9em' }}>
                    <WeatherPressure pressure={ city.pressure }/>
                </div>
                <div style={{ gridColumn:'1/3', fontSize:'.9em' }}>
                    <WeatherWind wind={ city.wind }/>
                </div>
            </div>

            <div className="city-data-minor">                     
                <TimeLocal offset={ city.offset } />
                {currentTime.toLocaleDateString('en-US', { timeZone: "UTC", weekday: 'long', month: 'long', day: 'numeric' })} 
                {nth(currentTime.getUTCDate())}
            </div>

            <div className="city-forecast">
                { [0,1,2,3,4].map( (i) =>
                    (city.forecast)
                    ? <ForecastDay key={ i } city={ city } i={ i }/> 
                    : <Loader key={ i } />
                )}
            </div>
    </div>
    )
}

export default CityBody
