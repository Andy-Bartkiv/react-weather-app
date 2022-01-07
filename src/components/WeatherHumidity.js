import { WiHumidity } from 'react-icons/wi'

const WeatherHumidity = ({ hum }) => {
    return (
        <div>
            <WiHumidity style={{ transform: 'scale(1.5)' }}/>
            { (hum) ? ` ${hum} %` : ''}
        </div>
    )
}

export default WeatherHumidity
