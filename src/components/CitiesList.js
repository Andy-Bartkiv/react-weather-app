import WeatherService from "../API/WeatherService";
import processWeatherData from "../utils/processWeatherData";
import processForecastData from "../utils/processForecastData";
import CityItem from "./CityItem";
import SortBar from './UI/sortbar/SortBar';
import { useContext, useState, useEffect, useRef } from "react";
import useSortedList from "../hooks/useSortedList";
import { DataContext } from "../context";

const CitiesList = ({ cities, setCities }) => {

    const API_LIMIT = 55; // 60
    const delayRefresh = () => 60 * (Math.floor(Math.random() * 15) + 60);

    const { min, 
        first, setFirst,
        apiReq, setApiReq, 
        activeCity, setActiveCity,
        } = useContext(DataContext);

    const [initLoading, setInitLoading] = useState(true);
    const [delID, setDelID] = useState(null);

    const [sort, setSort] = useState({ value:'', reverse: false });
    const drgMode = !sort.value;
    const sortedCities = useSortedList(cities, sort);

    const [drgCities, setDrgCities] = useState(cities);
    const [drgCity, setDrgCity] = useState(null);
    const [dropZoneIndex, setDropZoneIndex] = useState(null);
    const [divHide, setDivHide] = useState(null);
    const [divW, setDivW] = useState(null);

    const displayCities = [];
    const sourceCities = (drgMode) ? drgCities : sortedCities
    sourceCities.forEach( (city, i) => {
        displayCities.push({id: i}, city);
    });
    displayCities.push({id: sourceCities.length});

    
                                // useEffect( () => getAllWeather(cities), []);

    useEffect( () => {
        if (apiReq > 0) setApiReq(Math.floor(apiReq/2))
    }, [min]);

    useEffect( () => {
        if (!initLoading && first) {
            if (cities[0]) toggleActive(cities[0].id);
            setFirst(false);
        }
    }, [initLoading]);

    function deleteCity(event, cityID) {
        event.stopPropagation();
        setDelID(cityID);
        setTimeout( () => {
            setCities(cities.filter( city => city.id !== cityID));
            setDrgCities(cities.filter( city => city.id !== cityID));
            setDelID(null);
            if (activeCity && cityID === activeCity.id) 
                setActiveCity(null);
        }, 250); // timeout for Delete City animation = should match with CSS param
    }

    function toggleActive(city) {
        let currentActiveCity = null;
        if (!activeCity || activeCity.id !== city.id) {
            currentActiveCity = city;
            if (!city.forecast || Date.now()/1000 > city.forecast[0].dt) {
                getForecast(city.id);
            }
        }
        setActiveCity(currentActiveCity);
    }

    async function getAllWeather(cities) {
        const newCities = [];
        for (let city of cities) {
            const dt = (city.dt) ? city.dt : 0;
            if (Date.now()/1000 - dt < delayRefresh()) {
                newCities.push({...city});
                continue;
            }
            if ( apiReq < API_LIMIT ) {
                                                            console.log('- - - - - getting weather for', city.name)
                setApiReq(apiReq+1);
                let cityName = city.name;
                if (city.country) 
                    cityName += `,` + city.country;    
                const resp = await WeatherService.getWeather(cityName);
                const cityData = processWeatherData(resp);
                newCities.push({ ...city, ...cityData });
            } else {
                alert(`${apiReq}: Too much API requests per minute. Try again later.`);
                newCities.push({...city});
            }
        }
        setCities(newCities);
        setInitLoading(false);
    }
    
    async function getForecast(cityID) {
        const city = cities.find(city => city.id === cityID);
        let cityName = city.name;
        if (city.country) 
            cityName += `,` + city.country;
        if (apiReq < API_LIMIT) {
            setApiReq(apiReq+1);
            const resp = await WeatherService.getForecast(cityName);
            const cityForecast = processForecastData(resp);
            const newCities = [...cities].map(city => 
                (city.id === cityID) ? {...city, ...cityForecast} : city)
            setCities(newCities);
        } else {
            alert(`${apiReq}: Too much API requests per minute. Try again later.`)
        }
    }


    //   - - - - DRAG HANDLERS 
      
    function handleDragStart(e, city) {
        setTimeout( () => {
            setDivHide(sourceCities.indexOf(city));
            setDivW(sourceCities.indexOf(city) + 1);
            setDrgCity(city);
        }, 0)
        // console.log('drag START', city.name, divHide);
    }

    const handleDragEnd = (e, city) => {
        // console.log('drag END', city.name);
        // setTimeout( () => {
            setDrgCity(null);
            setDivHide(null);
            setDivW(null);
        // }, 0)
    }

    const handleDragEnter = (dropInd) => {
        // console.log('drag Enter', dropInd);
        setDropZoneIndex(dropInd);
    } 
    const handleDragLeave = (ph) => {
        // console.log('drag LEAVE', ph);
        setDropZoneIndex(null);
        setDivW(null);
    }

    const handleDrop = (e, dropInd) => {
        e.preventDefault();
        setDropZoneIndex(null);
        const indA = sourceCities.indexOf(drgCity);
        const indB = (dropInd > indA) ? dropInd - 1 : dropInd;
        // console.log('DROP', indA, dropInd, indB );
        const newArray = [...drgCities];
        newArray.splice(indA, 1);
        newArray.splice(indB, 0, drgCity);
        // setTimeout(() => {
            setCities(newArray);
            setDrgCities(newArray);
        // }, 0)
    } 

    return (
        <>
        <div className="city-list">
        {/* Cities List */}
            { displayCities.map( (city, i) => {
                if (i % 2 !== 0) {
                    const clsActive = (activeCity && activeCity.id === city.id) ? ' active' : '';
                    const clsDel = (delID === city.id) ? ' delete' : '';
                    const clsDrg = (drgCity && drgCity.id === city.id) ? ' dragging' : '';
                    return (
                        <div key={ city.id }
                            className={ `city` + clsActive + clsDel + clsDrg }
                            onClick={ () => toggleActive(city) }
                            draggable={ drgMode }
                            onDragStart={ e => handleDragStart(e, city) }
                            onDragEnd={ e => handleDragEnd(e, city) }
                        >    
                            <CityItem
                                city={ city } 
                                deleteCity={ deleteCity }
                            />
                        </div>
                    )
                } else {
                    const clsLast = (city.id === sourceCities.length) ? ' last' : '';
                    const clsActive = (dropZoneIndex === city.id || divW === city.id) ? ' active' : '';
                    const clsHide = (divHide === city.id) ? ' hide' : '';
                    return (
                    <div key={city.id}
                        className={"city-divider" + clsLast + clsActive + clsHide} 
                        onDragEnter={ () => handleDragEnter(city.id) }
                        onDragLeave={ () => handleDragLeave(city.id) }
                        onDragOver={ (e) => e.preventDefault() }
                        onDrop={ (e) => handleDrop(e, city.id) }
                    >    
                    </div>
                    )
                }
            })}
        </div>
        {/* Sorting Mode Panel */}
            { sortedCities.length > 1 &&
                <SortBar clsName='city' sort={ sort } setSort={ setSort }/>
            }
        </>
    )
}

export default CitiesList;
