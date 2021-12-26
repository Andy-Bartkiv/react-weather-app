
const CityItem = ({ city }) => {
    const temp = ((city.temp > 0) ? '+' : '-') + ` ${Math.round(Math.abs(city.temp))} \u00b0C`;

    return (
        <div className="city-item">
            <div className="city-header">
                <div style={{ width:'auto' }}>{city.name} / {city.country}</div>
                <div>{city.time}</div>
                <div>{city.temp && temp}</div>
                {/* <div>{city.weather}</div> */}
                { city.icon &&
                    <img src={`http://openweathermap.org/img/w/${city.icon}.png`} alt={`${city.weather}`}/>
                }
            </div>
            <div className="city-body">
                City-Body
            </div>
        </div>
    )
}

export default CityItem
