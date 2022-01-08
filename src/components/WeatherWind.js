import { GiWindsock } from 'react-icons/gi'
import { ImCompass } from 'react-icons/im'
import Loader from './UI/loader/Loader'

const WeatherWind = ({ wind }) => {
    return (
        <div style={{ display: 'flex', gap: '.25em' }}>
            <GiWindsock />
            { (wind) ? ` ${wind.speed} m/s ` : <Loader/> }
            { (wind) && <ImCompass style={{ transform: `rotate(${wind.deg}deg)` }}/> }
        </div>
    )
}

export default WeatherWind
