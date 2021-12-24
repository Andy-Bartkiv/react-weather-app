import MyButton from "./UI/button/MyButton"

const CitiesList = ({ cities, deleteCity }) => {
    return (
        <div className="city-list">
            <h3>Cities List</h3>
         
            { cities.map( (city, i) =>
                <div className="city" key={i}>
                    {city.name}
                    <MyButton onClick={ () => deleteCity(city.id) } style={{ padding: '.25em .5em' }}>
					    X
				    </MyButton>
                </div>
            )}
        </div>
    )
}

export default CitiesList
