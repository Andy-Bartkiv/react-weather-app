import { WiBarometer } from 'react-icons/wi'


const WeatherPressure = ({ pressure }) => {
    return (
        <div>
            <WiBarometer style={{ transform: 'scale(1.5)' }}/> 
            { (pressure) ? ` ${pressure} hPa` : ''}
        </div>
    )
}

export default WeatherPressure
