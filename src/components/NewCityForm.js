import { useState, useContext } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import WeatherService from "../API/WeatherService";

function NewCityForm({ cities, setCities }) {

    const [cityName, setCityName] = useState('');

    const addNewCity = async (event) => {
			event.preventDefault();

      const resp = await WeatherService.getGeo(cityName);
      const validName = (resp.data.length > 0);
      
      console.log(resp.data);
      resp.data.forEach( (item, ind) => 
        console.log(`${ind}. ${item.name}, ${item.country}, ${item.state}`)
      )

      if (validName) {
        const newCity = {id: Date.now(), name: resp.data[0].name, country: resp.data[0].country}
        setCities([...cities, newCity]);
        setCityName('');
      } else {
        alert('Please enter valid City Name')
      }
    }
    
    return (
      <form className="new-city-form" onSubmit={ addNewCity }>
        <MyInput 
          // required
          type="text" 
          placeholder="New City" 
          value={ cityName } 
          onChange= { e => setCityName(e.target.value)}
        />
        <MyButton style={{ minWidth: '25%', borderRadius: '.5em' }}>Add City</MyButton>
      </form>
    )
}

export default NewCityForm;