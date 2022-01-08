import GlobeMapBtn from "./GlobeMapBtn";
import DeleteBtn from "./DeleteBtn";
import CityHeader from "./CityHeader";
import CityBody from "./CityBody";

const CityItem = ({ city, deleteCity }) => {

    return (
        <div className="city-item"> 

            <GlobeMapBtn 
                city={ city } />
            <DeleteBtn 
                id={ city.id } deleteCity={ deleteCity } />

            <CityHeader city={ city } />
         
            <CityBody city={ city } />

        </div>
    )
}

export default CityItem
