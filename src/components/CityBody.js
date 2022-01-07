import TimeLocal from "./TimeLocal";
import WeatherIcon from "./WeatherIcon";
import nth from "../utils/nth"
import GlobeMapBtn from "./GlobeMapBtn";
import WeatherWind from "./WeatherWind";
import WeatherPressure from "./WeatherPressure";
import WeatherHumidity from "./WeatherHumidity";
import WeatherTemp from "./WeatherTemp";
import WeatherTempIcon from "./WeatherTempIcon";

const CityBody = ({ city }) => {

    const forecast = ['Mon, Jan 3','Tue, Jan 4','Wed, Jan 5','Thu, Jan 6','Fri, Jan 7'];

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
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                {', '}
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} 
                {nth(3)}
            </div>

            <div className="city-forecast">
                { forecast.map( (day, i) => {
                    // console.log(i*8+4, i*8+8, city.id, day, city.forecast);
                    // if (city.forecast) 
                    return (<div className="forecast-day" key={i}>
                        <div className="forecast-day-title">{ day }</div>
                        <WeatherIcon icon={ city.icon }/>
                        <WeatherIcon icon={ city.icon }/>
                        <WeatherTemp tempCelsius={ city.temp }/>
                        <WeatherTemp tempCelsius={ city.temp }/>
                    
                        {/* <WeatherIcon icon={ city.forecast[i*8+4].weather[0].icon }/>
                        <WeatherIcon icon={ city.forecast[i*8+8].weather[0].icon }/> */}
                        {/* <WeatherTemp tempCelsius={ city.forecast[i*8+4].main.temp} size=".85em"/>
                        <WeatherTemp tempCelsius={ city.forecast[i*8+8].main.temp } size=".85em"/> */}
                    </div>)
                }
                )}
            </div>
    </div>
    )
}

export default CityBody
