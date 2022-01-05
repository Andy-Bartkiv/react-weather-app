import { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import WeatherService from "../API/WeatherService";
import processWeatherData from "../utils/processWeatherData";

function NewCityForm({ cities, setCities }) {

    const [cityName, setCityName] = useState('');
    const [showItem, setShowItem] = useState(false);
    setTimeout( () => setShowItem(true), 0);
    const clsShow = (showItem) ? " show" : "";

    async function addNewCity(event) {
			event.preventDefault();
      if (cityName === '') return;
      const resp = await WeatherService.getGeo(cityName);
      const validName = (resp.data.length > 0);
      
      const goodCity = resp.data.find(respCity => {
        return !cities.find(city => {
          // console.log(city.name + city.country, respCity.name + respCity.country)
          return (respCity.name + respCity.country == city.name + city.country)
        })
      })

      if (validName && goodCity) {
        const citySearch = `${goodCity.name}, ${goodCity.country}`;
        // console.log(citySearch, resp.data);
        const resp2 = await WeatherService.getWeather(citySearch);
        const newCity = processWeatherData(resp2);
        // console.log(newCity);
        setCities([...cities, newCity]);
        setCityName('');
      } else {
        alert(`Can not find city by name: ${cityName}!`)
      }
    }
    
    return (
      <form className={ "new-city-form" + clsShow } onSubmit={ addNewCity }>
        <MyInput 
          // required
          type="text" 
          placeholder="New City" 
          value={ cityName } 
          onChange= { e => setCityName(e.target.value) }
        />
        <MyButton style={{ minWidth: '25%', borderRadius: '.5em' }}>Add City</MyButton>
      </form>
    )
}

export default NewCityForm;