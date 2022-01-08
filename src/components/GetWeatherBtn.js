import MyButton from "./UI/button/MyButton";
import { FaCloudSunRain } from 'react-icons/fa'

const GetWeatherBtn = ({ id, getWeather }) => {
    return (
        <div style={{ position: 'absolute', top: '.2em', right: '1.6em' }}>
            <MyButton 
                onClick={ (event) => getWeather(event, id) } 
                style={{ borderColor: 'transparent', padding: '0' }}>
                <FaCloudSunRain style={{ height: '1.75em', width: '1.75em' }}/>
            </MyButton>
        </div>
    )
}

export default GetWeatherBtn
