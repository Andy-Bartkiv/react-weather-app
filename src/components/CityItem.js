import GlobeMapBtn from "./GlobeMapBtn";
import DeleteBtn from "./DeleteBtn";
import GetWeatherBtn from "./GetWeatherBtn";
import CityHeader from "./CityHeader";
import CityBody from "./CityBody";

const CityItem = ({ city, deleteCity, getWeather }) => {

    return (
        <div className="city-item">

            <GlobeMapBtn city={ city } />
            <DeleteBtn city={ city } deleteCity={ deleteCity } />
            <GetWeatherBtn city={ city } getWeather={ getWeather } />

            <CityHeader city={ city } />
         
            <CityBody city={ city} />

        </div>
    )
}

export default CityItem
