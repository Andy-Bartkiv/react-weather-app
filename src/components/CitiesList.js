import WeatherService from "../API/WeatherService";
import processWeatherData from "../utils/processWeatherData";
import processForecastData from "../utils/processForecastData";
import CityItem from "./CityItem";
import { useContext, useState } from "react";
import { DataContext } from "../context";

const CitiesList = ({ cities, setCities }) => {

    const { activeCity, setActiveCity } = useContext(DataContext);

    const [delID, setDelID] = useState(null);
    const [drgCity, setDrgCity] = useState(null);
    const [tmpCities, setTmpCities] = useState(null);

    function deleteCity(cityID, event) {
        event.stopPropagation();
        setDelID(cityID);
        setActiveCity(null);
        setTimeout( () => {
            setCities(cities.filter( city => city.id !== cityID))
            setDelID(null);
        }, 250); // timeout for Delete City animation = should match with CSS param
    }

    // async ??????
    function toggleActive(e, cityID) {
        const currentActiveCity = (activeCity && activeCity.id === cityID)
            ? null
            : cities.find( city => city.id === cityID )
        setActiveCity(currentActiveCity);
    }

    async function getWeather(event, cityID) {
        event.stopPropagation();

        const city = cities.find(city => city.id === cityID);
        let cityName = city.name;
        if (city.country) 
            cityName += `,` + city.country;
        const resp = await WeatherService.getWeather(cityName);
        console.log(resp.data);
    
        const cityData = processWeatherData(resp);
        const newCities = [...cities].map(city => 
            (city.id === cityID) ? {...city, ...cityData} : city )
        setCities(newCities);
        // console.table(newCities);
        console.log(cityData)
    }
    
    async function getForecast(event, cityID) {
        const city = cities.find(city => city.id === cityID);
        let cityName = city.name;
        if (city.country) 
            cityName += `,` + city.country;
        console.log(cityName);
        const resp = await WeatherService.getForecast(cityName);
        // console.log(resp.data.city.name, resp.data.list);
        const cityForecast = processForecastData(resp);
        console.log(cityForecast);
        const newCities = [...cities].map(city => 
          (city.id === cityID) ? {...city, ...cityForecast} : city 
        )
        setCities(newCities);
        console.table(newCities);
        
        // list..map(e => e.dt_txt.slice(11,13))
    }
    
    return (
        <div className="city-list">
            { cities.map( (city, i) => {
                const clsActive = (activeCity && activeCity.id === city.id) ? ' active' : '';
                const clsDel = (delID === city.id) ? ' delete' : '';
                return (
                    <div key={ city.id } 
                        className={ `city` + clsActive + clsDel } 
                        onClick={ (e) => toggleActive(e, city.id) }
                    >    
                        <CityItem
                            city={ city } 
                            deleteCity={ deleteCity } 
                            getWeather={ getWeather }
                            // getForecast= { getForecast} 
                        />
                    </div>
                )
            }
            )}
        </div>
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