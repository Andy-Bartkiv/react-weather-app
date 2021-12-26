import { useState, useContext } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

function NewCityForm({ cities, setCities }) {

    const [cityName, setCityName] = useState('');

    const addNewCity = (event) => {
			event.preventDefault();
      const newCity = {id: Date.now(), name: (cityName !=='') ? cityName : 'New City'}
			setCities([...cities, newCity]);
			setCityName('');
    }
    
    return (
      <form className="new-city-form" onSubmit={ addNewCity }>
        <MyInput 
          type="text" 
          placeholder="New City" 
          value={ cityName } 
          onChange= { e => setCityName(e.target.value)}
        />
        <MyButton style={{ minWidth: '25%' }}>Add New City</MyButton>
      </form>
    )
}

export default NewCityForm;