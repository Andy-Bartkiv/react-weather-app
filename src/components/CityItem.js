
const CityItem = ({ city }) => {

    return (
        <div className="city-item">
            <div className="city-header">
                <div style={{width:'20%'}}>{city.name} / {city.country}</div>
                <div>{city.time}</div>
                <div>{city.temp && `t = ${Math.round(city.temp)}\u00b0C`}</div>
                <div>{city.weather}</div> 
            </div>
            <div className="city-body">
                City-Body
            </div>
        </div>
    )
}

export default CityItem
