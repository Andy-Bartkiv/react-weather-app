import { WiHumidity } from 'react-icons/wi';
import Loader from './UI/loader/Loader';

const WeatherHumidity = ({ hum }) => {
    return (
        <div style={{ display: 'flex', gap: '.25em' }}>
            <WiHumidity style={{ transform: 'scale(1.5)' }}/>
            { (hum) ? ` ${hum} %` : <Loader/>}
        </div>
    )
}

export default WeatherHumidity
