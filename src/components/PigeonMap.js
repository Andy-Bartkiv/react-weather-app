import { Map, ZoomControl, Overlay } from "pigeon-maps"
import { useState, useContext } from "react"
import { DataContext } from "../context"
import CityMapOverlay from "./CityMapOverlay"

const PigeonMap = ({ center }) => {

    const { fiveCities, myCities } = useContext(DataContext);
    const [mapCenter, setMapCenter] = useState(center)
    const [zoom, setZoom] = useState(5);

    const allCities = [...fiveCities];
    [...myCities].forEach(myCity => {
        if (!allCities.find(city => city.id === myCity.id))
            allCities.push(myCity);
    })

    return (
        <Map 
            defaultZoom={ 5 }
            center={ mapCenter }
            zoom={ zoom }
            onBoundsChanged={({ zoom }) => { 
                setZoom(zoom);
                setMapCenter(null); 
            }}
        >
            <ZoomControl
                style={{ left:'auto', right: '.5em', top: '.5em' }} 
                buttonStyle={{ background: '#282c44aa', color: 'orange' }}/>

            { allCities.map( city => 
                <Overlay key={city.id} anchor={ [city.coord.lat, city.coord.lon] }>
                    <CityMapOverlay 
                        city={ city } 
                        zoom={ zoom } 
                        setMapCenter={ setMapCenter } 
                        setZoom={ setZoom }/>
                </Overlay>
            )}

        </Map>
    )
}

export default PigeonMap
