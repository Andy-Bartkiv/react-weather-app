import { useRef, useEffect, useContext, useState } from 'react';
import { DataContext } from "../context";
import Globe from 'react-globe.gl';
import globeImage from '../data/earth-blue-marble.jpg'

const GlobeGL = ({ center, dim }) => {

  console.log(dim)

  const {fiveCities, myCities} = useContext(DataContext);
  const [centerPOV, setCenterPOV] = useState(center);
  const globeEl = useRef();
  
  const containerMin = 500;
  
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

  function handleLabelClick(city) {
    const rotationDelay = 0;
    const rotationPrecission = 25;
    let [lat, lon] = [...centerPOV];
    const dLat = (centerPOV[0] - city.coord.lat)/rotationPrecission;
    const dLon = (centerPOV[1] - city.coord.lon)/rotationPrecission;
    let counter = 0;
    let timer = setTimeout( function tick() {
      counter++;
      [lat, lon] = [lat-dLat, lon-dLon]
      setCenterPOV([lat, lon])
      if (counter < rotationPrecission) 
        timer = setTimeout( tick, rotationDelay );
      else 
        setCenterPOV([city.coord.lat, city.coord.lon]) 
    }, rotationDelay);
  }

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
          const temp = (city.temp)
          ? ((city.temp > 0) ? ' +' : ' -') + `${Math.round(Math.abs(city.temp))}\u00b0C`
          : ''
          return city.name + temp; 
        }}
        labelColor={ city => (city.temp) 
          ? (city.temp <= 0) ? '#0ff' : 'orange' 
          : 'whitesmoke'
        }
        labelLabel={ city => {
          if (city.icon) 
            return (
              `<img class="img-weather" 
                src="http://openweathermap.org/img/w/${city.icon}.png"/>`)
        }} 

        // onLabelClick={ city => handleLabelClick(city) }
        onLabelClick={ city => setCenterPOV([city.coord.lat, city.coord.lon]) 
        }

      />
    )
}

export default GlobeGL
