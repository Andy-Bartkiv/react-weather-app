import GlobeMapBtn from "./GlobeMapBtn";
import DeleteBtn from "./DeleteBtn";
import GetWeatherBtn from "./GetWeatherBtn";
import CityHeader from "./CityHeader";
import CityBody from "./CityBody";

const CityItem = ({ city, deleteCity, getWeather }) => {

    return (
        <div className="city-item">

            <GlobeMapBtn 
                city={ city } />
            <DeleteBtn 
                id={ city.id } deleteCity={ deleteCity } />
            <GetWeatherBtn 
                id={ city.id } getWeather={ getWeather } />

            <CityHeader city={ city } />
         
            <CityBody city={ city} />

        </div>
    )
}

export default CityItem
