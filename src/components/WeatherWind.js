import { GiWindsock } from 'react-icons/gi'
import { ImCompass } from 'react-icons/im'

const WeatherWind = ({ wind }) => {
    return (
        <div>
            <GiWindsock />
            { (wind) ? ` ${wind.speed} m/s ` : ' ' }
            { (wind) && <ImCompass style={{ transform: `rotate(${wind.deg}deg)` }}/> }
        </div>
    )
}

export default WeatherWind
