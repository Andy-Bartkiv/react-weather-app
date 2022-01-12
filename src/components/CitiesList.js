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

    const [sort, setSort] = useState({ value:'', reverse: false });
    const [initLoading, setInitLoading] = useState(true);
    const [delID, setDelID] = useState(null);

    const [drg, setDrg] = useState(false);
    const [drgEnter, setDrgEnter] = useState(null);
    const [swap, setSwap] = useState({a:null, b:null})
    const [drgCity, setDrgCity] = useState(null);
    const [tmpCities, setTmpCities] = useState(null);

    const sortedCities = useSortedList(cities, sort, swap);

    const drgMode = !sort.value;
    const drgItem = useRef();
    const drgNode = useRef();
    
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

    function handleDragStart(event, city) {
        event.stopPropagation();
        console.log('Drag START @', city.name);
        setDrgEnter(null);
        drgItem.current = city;
        drgNode.current = event.target;
        drgNode.current.addEventListener('dragend', handleDragEnd);
        setTmpCities(cities);
        setTimeout( () => setDrg(true), 0);
    }

    function handleDragEnd() {
        console.log('DRG END')
        drgItem.current = null;
        drgNode.current.removeEventListener('dragend', handleDragEnd);
        drgNode.current = null;
        setDrg(false);
        // setSwap(null);
    }

    function handleDragEnter(event, city) {
        event.stopPropagation();
        // console.log(drgEnter, city.name)
        if (drgEnter !== city) {
            setDrgEnter(city);
            const currentItem = drgItem.current;
            const ind1 = cities.indexOf(currentItem);
            const ind2 = cities.indexOf(city);
            console.log('Drag ENTER', city.name, ind1, ind2);
            if (event.target !== drgNode.current) {
                setSwap({a:ind1, b:ind2})
                // setDrgEnter(null);
                // drgItem.current = city;
                // const newArray = tmpCities.splice(ind1,1);
                // console.log(newArray, tmpCities);
                // setCities(oldList => {
                //     let newList = JSON.parse(JSON.stringify(oldList));
                //     newList.splice(ind2, 0, newArray[0]);
                //     return newList;
                // });
            }
        }
    }

    function deleteCity(event, cityID) {
        event.stopPropagation();
        setDelID(cityID);
        setTimeout( () => {
            setCities(cities.filter( city => city.id !== cityID))
            setDelID(null);
            if (cityID === activeCity.id) 
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

    return (
        <>
        <div className="city-list">
        {/* Cities List */}
            { sortedCities.map( (city) => {
                const clsActive = (activeCity && activeCity.id === city.id) ? ' active' : '';
                const clsDel = (delID === city.id) ? ' delete' : '';
                const clsDrg = (drg && drgItem.current.id === city.id) ? ' dragging' : '';
                return (
                    <div key={ city.id }
                        className={ `city` + clsActive + clsDel + clsDrg } 
                        onClick={ () => toggleActive(city) }
                        draggable={ drgMode }
                        onDragStart={ (e) => handleDragStart(e, city) }
                        // onDragEnd={ handleDragEnd }
                        onDragEnter={ (e) => handleDragEnter(e, city) }
                        >    
                        <CityItem
                            city={ city } 
                            deleteCity={ deleteCity }
                            onDragEnter={ () => console.log('surprise') }
                        />
                    </div>
                )
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



// const CitiesList = ({ cities, setCities }) => {

//     const { activeCity, setActiveCity } = useContext(DataContext);

//     const [delID, setDelID] = useState(null);
//     const [drgCity, setDrgCity] = useState(null);
//     const [tmpCities, setTmpCities] = useState(null);

//     function deleteCity(cityID, event) {
//         event.stopPropagation();
//         setDelID(cityID);
//         setActiveCity(null);
//         setTimeout( () => {
//             setCities(cities.filter( city => city.id !== cityID))
//             setDelID(null);
//         }, 250); // timeout for Delete City animation = should match with CSS param
//     }

//     // async ??????
//     async function toggleActive(e, cityID) {
//         const currentActiveCity = (activeCity && activeCity.id === cityID)
//             ? null
//             : cities.find( city => city.id === cityID )
//         setActiveCity(currentActiveCity);

//                                                 // console.log(e.target.style);

//         if (activeCity) {
//             console.log(activeCity)

//             getForecast(e, activeCity.id)
            
//             // list..map(e => e.dt_txt.slice(11,13))
//         }
//     }

//     async function getWeather(event, cityID) {
//         event.stopPropagation();

//         const city = cities.find(city => city.id === cityID);
//         let cityName = city.name;
//         if (city.country) 
//             cityName += `,` + city.country;
//         const resp = await WeatherService.getWeather(cityName);
//         console.log(resp.data);
    
//         const cityData = processWeatherData(resp);
//         const newCities = [...cities].map(city => 
//             (city.id === cityID) ? {...city, ...cityData} : city )
//         setCities(newCities);
//         // console.table(newCities);
//         console.log(cityData)
//     }
    
//     async function getForecast(event, cityID) {
//         const city = cities.find(city => city.id === cityID);
//         let cityName = city.name;
//         if (city.country) 
//             cityName += `,` + city.country;
//         console.log(cityName);
//         const resp = await WeatherService.getForecast(cityName);
//         // console.log(resp.data.city.name, resp.data.list);
//         const cityForecast = processForecastData(resp);
//         console.log(cityForecast);
//         const newCities = [...cities].map(city => 
//           (city.id === cityID) ? {...city, ...cityForecast} : city 
//         )
//         setCities(newCities);
//         console.table(newCities);
        
//         // list..map(e => e.dt_txt.slice(11,13))
//     }
    
//     //   - - - - DRAG HANDLERS 

//     const handleDrag = (e, cityID) => console.log('DRAGging', cityID);
      
//     function handleDragStart(e, cityID) {
//         console.log('drag START', cityID);
//         setDrgCity(cities.find(city => city.id === cityID))
//         // setTmpCities(cities.filter( city => city.id !== cityID))
//         // setActiveID(null);
//         // setDelID(cityID);
//     }

//     useEffect( () => {
//         const drgIndex = cities.indexOf(city => city.id == drgCity.id);
//         // console.log(drgCity);
//         // console.log(drgIndex);
//         // if (drgCity)
//         //     console.log(drgCity.id, cities[0].id)
//     }, [drgCity])
//     useEffect(() => {
//         if (tmpCities && tmpCities.length === cities.length) {
//             setCities(tmpCities);
//             // setTimeout ( () => setDelID(null), 250);
//         }
//     }, [tmpCities])


//     const handleDragEnd = (e, cityID) => {
//         console.log('drag END', cityID);
//         // setTmpCities([...tmpCities, drgCity]);
//     }
    

//     const handleDragOver = (e, cityID) => {
//         e.preventDefault();
//         // console.log('drag OVER', cityID);
//     } 
//     const handleDragEnter = (e, cityID) => {
//         console.log('drag Enter', cityID);
//         const ind = newArray.findIndex(city => drgCity.id === city.id);
//         console.log(ind, cityID, cityID);
//         if (cityID !== ind+1 && cityID !== ind-1)
//             e.target.style.height = '2.5em';
//     } 
//     const handleDragLeave = (e, cityID) => {
//         // console.log('drag LEAVE', cityID);
//         e.target.style.height = '.75em';
//     } 
//     const handleDrop = (e, cityID) => {
//         e.preventDefault();
//         console.log('DROP', cityID);
//         e.target.style.height = '.75em';
//     } 

//     const newArray = [];
//     cities.forEach( (city, i) => {
//         newArray.push(i)
//         newArray.push(city);
//     })
//     newArray.push(-1);
//     console.log(newArray);

//     return (
//         <div className="city-list">
//             { newArray.map( (city, i) => {
//                 if (i % 2 !== 0) {
//                     const clsActive = (activeCity && activeCity.id === city.id) ? ' active' : '';
//                     const clsDel = (delID === city.id) ? ' delete' : '';
//                     return (
//                         <div 
//                             key={ city.id } 
//                             className={ `city` + clsActive + clsDel } 
//                             onClick={ (e) => toggleActive(e, city.id) }
//                             draggable={true}
//                             // onDrag={ (e) => handleDrag(e, city.id) }
//                             onDragStart={ (e) => handleDragStart(e, city.id) }
//                             onDragEnd={ (e) => handleDragEnd(e, city.id) }
//                         >    
//                             <CityItem
//                                 city={ city } 
//                                 deleteCity={ deleteCity } 
//                                 getWeather={ getWeather } />
//                         </div>)
//                 } else {
//                     return (
//                         <div 
//                             key={i}
//                             style={{ height: '.75em', 
//                                     // background: 'darkgreen', 
//                                     transition: '.5s ease-out', 
//                                     flex: (city !== -1) ? null : '1 1 0' }}
//                             onDrop={ (e) => handleDrop(e, i) }
//                             onDragOver={ (e) => handleDragOver(e, i) }
//                             onDragEnter={ (e) => handleDragEnter(e, i) }
//                             onDragLeave={ (e) => handleDragLeave(e, i) }

//                         >    
//                         </div>
//                         )
//                     }
//                 }
//             )}
//         </div>
//     )
// }