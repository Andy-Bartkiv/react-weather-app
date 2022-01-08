import { WiBarometer } from 'react-icons/wi'
import Loader from './UI/loader/Loader'

const WeatherPressure = ({ pressure }) => {
    return (
        <div style={{ display: 'flex', gap: '.25em' }}>
            <WiBarometer style={{ transform: 'scale(1.5)' }}/> 
            { (pressure) 
                ? ` ${pressure} hPa`
                : <Loader/> 
                }
        </div>
    )
}

export default WeatherPressure
