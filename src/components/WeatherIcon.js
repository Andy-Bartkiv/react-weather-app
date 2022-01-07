import Loader from "./UI/loader/Loader"

const WeatherIcon = ({ icon }) => {
    return (
        <div>
            { (icon) 
                ? <img src={`https://openweathermap.org/img/w/${icon}.png`} />
                : <Loader/> 
            }   
        </div>
    )
}

export default WeatherIcon
