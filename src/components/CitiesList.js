import WeatherService from "../API/WeatherService";
import processWeatherData from "../utils/processWeatherData";
import CityItem from "./CityItem";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context";

const CitiesList = ({ cities, setCities }) => {

    const {setCoord, is3D} = useContext(DataContext);

    const [delID, setDelID] = useState(null);
    const [activeID, setActiveID] = useState(null);
    const [drgCity, setDrgCity] = useState(null);
    const [tmpCities, setTmpCities] = useState(null);

    function deleteCity(cityID, event) {
        event.stopPropagation();
        setDelID(cityID);
        setTimeout( () => {
            setCities(cities.filter( city => city.id !== cityID))
            setDelID(null);
        }, 500); // timeout for Delete City animation
    }

    // async ??????
    async function toggleActive(cityID) {
        // console.table(cities);

        const activeCity = (activeID !== cityID)
            ? cityID
            : null
        setActiveID(activeCity);
        if (activeCity) {
            const city = cities.find(city => city.id === cityID);
            let cityName = city.name;
            if (city.country) 
                cityName += `,` + city.country;
            // console.log(cityName);
            // const resp = await WeatherService.getForecast(cityName);
            // console.log(resp.data);
            setCoord([city.coord.lat, city.coord.lon])
        }
    }

    async function getWeather(cityID, event) {
        event.stopPropagation();

        const city = cities.find(city => city.id === cityID);
        let cityName = city.name;
        if (city.country) 
            cityName += `,` + city.country;
        const resp = await WeatherService.getWeather(cityName);
        console.log(resp.data);
    
        const cityData = processWeatherData(resp);
        const newCities = [...cities].map(city => 
          (city.id === cityID) ? {...city, ...cityData} : city 
        )
        setCities(newCities);
        console.table(newCities)
        // navigator.geolocation.getCurrentPosition((pos) => console.log(pos))
      }
    
    //   - - - - DRAG HANDLERS 

    const handleDrag = (e, cityID) => console.log('DRAGging', cityID);
      
    function handleDragStart(e, cityID) {
        console.log('drag START', cityID);
        setDrgCity(cities.find(city => city.id === cityID))
        setTmpCities(cities.filter( city => city.id !== cityID))
        // setActiveID(null);
        // setDelID(cityID);
    }

    useEffect(() => console.log(drgCity), [drgCity])
    useEffect(() => {
        if (tmpCities && tmpCities.length === cities.length) {
            setCities(tmpCities);
            // setTimeout ( () => setDelID(null), 250);
        }
    }, [tmpCities])


    const handleDragEnd = (e, cityID) => {
        console.log('drag END', cityID);
        setTmpCities([...tmpCities, drgCity]);
    }
    

    const handleDragOver = (e, cityID) => {
        e.preventDefault();
        console.log('drag OVER', cityID);
    } 
    const handleDragEnter = (e, cityID) => {
        console.log('drag Enter', cityID);
        e.target.style.height = '2.5em';
    } 
    const handleDragLeave = (e, cityID) => {
        console.log('drag LEAVE', cityID);
        e.target.style.height = '.5em';
    } 
    const handleDrop = (e, cityID) => {
        e.preventDefault();
        console.log('DROP', cityID);
        e.target.style.height = '.5em';
    } 

    const newArray = [];
    cities.forEach( (city, i) => {
        newArray.push(i)
        newArray.push(city);
    })
    newArray.push(-1);
    console.log(newArray);

    return (
        <div className="city-list">
            { newArray.map( (city, i) => {
                if (i % 2 !== 0) {
                    const clsActive = (activeID === city.id) ? ' active' : '';
                    const clsDel = (delID === city.id) ? ' delete' : '';
                    return (
                        <div 
                            key={ city.id } 
                            className={ `city` + clsActive + clsDel } 
                            onClick={ () => toggleActive(city.id) }
                            draggable={true}
                            // onDrag={ (e) => handleDrag(e, city.id) }
                            onDragStart={ (e) => handleDragStart(e, city.id) }
                            onDragEnd={ (e) => handleDragEnd(e, city.id) }
                        >    
                            <CityItem
                                is3D={ is3D }
                                city={ city } 
                                deleteCity={ deleteCity } 
                                getWeather={ getWeather } />
                        </div>)
                } else {
                    return (
                        <div 
                            key={i} 
                            style={{ height: '.75em', background: 'darkgreen', transition: '.5s ease-out', 
                                flex: (city !== -1) ? null : '1 1 0' }}
                            onDrop={ (e) => handleDrop(e, city) }
                            onDragOver={ (e) => handleDragOver(e, city) }
                            onDragEnter={ (e) => handleDragEnter(e, city) }
                            onDragLeave={ (e) => handleDragLeave(e, city) }

                        >    
                        </div>
    )
                    }
                }
            )}
        </div>
    )
}

export default CitiesList;
