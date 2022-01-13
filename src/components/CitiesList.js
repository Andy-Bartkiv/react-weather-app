import WeatherService from "../API/WeatherService";
import processWeatherData from "../utils/processWeatherData";
import processForecastData from "../utils/processForecastData";
import { addClassName, removeClassName } from "../utils/toggleClassName";
import CityItem from "./CityItem";
import SortBar from './UI/sortbar/SortBar';
import { useContext, useState, useEffect, useRef } from "react";
import useSortedList from "../hooks/useSortedList";
import { DataContext } from "../context";

const CitiesList = ({ cities, setCities }) => {

    const API_LIMIT = 55; // 60
    // different refresh rate weatherdata to avoid API_Limit break  
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

    const [drgCity, setDrgCity] = useState(null);
    const [drgIndex, setDrgIndex] = useState(null);
    const divRef = useRef([]);

    const displayCities = [];
    const sourceCities = (drgMode) ? cities : sortedCities
    sourceCities.forEach( (city, i) => {
        displayCities.push({id: i}, city);
    });
    displayCities.push({id: sourceCities.length});

    
    // useEffect( () => getAllWeather(cities), []);

    // half api request counter each minute
    useEffect( () => {
        if (apiReq > 0) setApiReq(Math.floor(apiReq/2))
    }, [min]);

    // Open (make active) first city tab at first App run 
    useEffect( () => {
        if (!initLoading && first) {
            if (cities[0]) toggleActive(cities[0]);
            setFirst(false);
        }
    }, [initLoading]);

    function deleteCity(event, cityID) {
        event.stopPropagation();
        setDelID(cityID);
        setTimeout( () => {
            setCities(cities.filter( city => city.id !== cityID));
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
                                                            // console.log('- - - - - getting weather for', city.name)
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

/////////////////////////// DRAG-n-DROP HANDLERS 
      
    const handleDragStart = (city) => {
        setTimeout( () => {
            const cityIndex = sourceCities.indexOf(city);
            if (divRef.current) 
                addClassName(divRef.current[cityIndex + 1], ['active', 'instant']);
            setDrgCity(city);
            setDrgIndex(cityIndex);
        }, 0)
        setTimeout( () => {
            removeClassName(divRef.current[sourceCities.indexOf(city) + 1], ['instant'])
        }, 50)
    }
    const handleDragEnd = (city) => {
        removeClassName(divRef.current[sourceCities.indexOf(city) + 1], ['active']);
        setDrgCity(null);
        setDrgIndex(null);
    }
    const handleDragEnter = (dropInd) => {
        console.log('drag Enter', dropInd);
        addClassName(divRef.current[dropInd], ['active']);
    } 
    const handleDragLeave = (dropInd) => {
        console.log('drag LEAVE', dropInd);
        removeClassName(divRef.current[dropInd], ['active']);
        removeClassName(divRef.current[sourceCities.indexOf(drgCity) + 1], ['active', 'instant']);
    }
    const handleDrop = (e, dropInd) => {
        e.preventDefault();
        addClassName(divRef.current[dropInd], ['instant']);
        removeClassName(divRef.current[dropInd], ['active']);
        const indA = sourceCities.indexOf(drgCity);
        const indB = (dropInd > indA) ? dropInd - 1 : dropInd;
        const newArray = [...cities];
        newArray.splice(indA, 1);
        newArray.splice(indB, 0, drgCity);
        setCities(newArray);
        setTimeout( () => {
            removeClassName(divRef.current[dropInd], ['instant'])
        }, 0)
    } 
//////////////////////////////////////////////////////////////////////
    return (
        <>
        <div className="city-list">
        {/* Cities List */}
            { displayCities.map( (city, i) => {
                if (i % 2 !== 0) { // CITY tabs themselves
                    const clsActive = (activeCity && activeCity.id === city.id) ? ' active' : '';
                    const clsDel = (delID === city.id) ? ' delete' : '';
                    const clsDrg = (drgCity && drgCity.id === city.id) ? ' dragging' : '';
                    return (
                        <div key={ city.id }
                            className={ `city` + clsActive + clsDel + clsDrg }
                            onClick={ () => toggleActive(city) }
                            draggable={ drgMode }
                            onDragStart={ () => handleDragStart(city) }
                            onDragEnd={ () => handleDragEnd(city) }
                        >    
                            <CityItem
                                city={ city } 
                                deleteCity={ deleteCity }
                            />
                        </div>
                    )
                } else { // dividers between each CITY tab
                    const clsLast = (city.id === sourceCities.length) ? ' last' : '';
                    const clsHide = (city.id === drgIndex) ? ' hide' : '';
                    return (
                    <div key={ city.id }
                        ref={ el => divRef.current[city.id] = el }
                        className={ "city-divider" + clsLast + clsHide }
                        style={{ zIndex: (drgCity) ? '3' : '-3' }}
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
