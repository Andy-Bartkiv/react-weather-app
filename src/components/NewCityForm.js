import { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

function NewCityForm({ addCity }) {

    const [cityName, setCityName] = useState('');

    const addNewCity = (event) => {
			event.preventDefault();
			addCity({id: Date.now(), name: (cityName !=='') ? cityName : 'New City'});
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
        <MyButton style={{ minWidth: '25%' }}> Add New City</MyButton>
      </form>
    )
}

export default NewCityForm;