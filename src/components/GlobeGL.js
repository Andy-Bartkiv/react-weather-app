import { useRef, useEffect, useContext, useState } from 'react';
import { DataContext } from "../context";
import Globe from 'react-globe.gl';
import globeImage from '../data/earth-blue-marble.jpg';
import convertCtoF from '../utils/convertCtoF';

const GlobeGL = ({ center, dim }) => {

  const { fiveCities, myCities, isCelsius} = useContext(DataContext);
  const [centerPOV, setCenterPOV] = useState(center);
  const globeEl = useRef();
  
  const allCities = [...fiveCities];
  [...myCities].forEach(myCity => {
      if (!allCities.find(city => city.id === myCity.id))
          allCities.push(myCity);
  })

  useEffect(() => {
    globeEl.current.pointOfView({ lat: centerPOV[0], lng: centerPOV[1], altitude: 1.65 });
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = .125;
  }, []);

  useEffect(() => {
    globeEl.current.pointOfView({ lat: centerPOV[0], lng: centerPOV[1] });
  }, [centerPOV])

    return (
        <Globe
        ref={globeEl}
        // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        // globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
        // globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        globeImageUrl={globeImage}
        backgroundColor="#282c34"
        showGraticules={true}
        width={dim.width}
        height={dim.height}
        // City and Weather LABELS
        labelsData={allCities}
        labelLat={ city => city.coord.lat}
        labelLng={ city => city.coord.lon}
        labelDotRadius={ .5 }
        labelSize={ 1.35 } 
        // labelDotOrientation={ () => 'top' }
        labelText={ city => {
          const cityTemp = (isCelsius) ? city.temp : convertCtoF(city.temp);
          const temp = ((city.temp > 0) ? '+' : '-') 
            + ` ${Math.round(Math.abs(cityTemp))} \u00b0${isCelsius?"C":"F"}`;
          return city.name + ((city.temp) ? temp : ""); 
        }}
        labelColor={ city => (city.temp) 
          ? (city.temp <= 0) ? '#0ff' : 'orange' 
          : 'whitesmoke'
        }
        labelLabel={ city => {
          if (city.icon) 
            return (
              `<img class="img-weather" 
                src="https://openweathermap.org/img/w/${city.icon}.png"/>`)
        }} 

        // onLabelClick={ city => handleLabelClick(city) }
        onLabelClick={ city => setCenterPOV([city.coord.lat, city.coord.lon]) }

      />
    )
}

export default GlobeGL
