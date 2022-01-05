
const WeatherIcon = ({ icon  }) => {
    return (
        <>
            { icon && 
                <img 
                    src={`https://openweathermap.org/img/w/${icon}.png`}
                /> }   
        </>
    )
}

export default WeatherIcon
