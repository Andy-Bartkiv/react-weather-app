{
    const addNewCity = async (event) => {
        event.preventDefault();
  if (cityName === '') return;
  const resp = await WeatherService.getGeo(cityName);
  // resp.data.forEach( (item, ind) => 
  //   console.log(`${ind}. ${item.name}, ${item.country}, ${item.state}`)
  // )
  console.log(resp.data);
  const validName = (resp.data.length > 0);
  

  console.log(resp.data[0].lat, resp.data[0].lon)
  const doubleCity = cities.find(city => {
    console.log(city.coord.lat, city.coord.lon, comapreLatLon([resp.data[0].lat, resp.data[0].lon],[city.coord.lat, city.coord.lon,]))
    return comapreLatLon([resp.data[0].lat, resp.data[0].lon], [city.coord.lat, city.coord.lon])
  })
  console.log(!doubleCity);

  const goodCity = resp.data.find(respCity => {
    return !cities.find(city => {
      return comapreLatLon([respCity.lat, respCity.lon], [city.coord.lat, city.coord.lon])
    })
  })

  console.log(goodCity);
  const citySearch = `${goodCity.name}, ${goodCity.country}, ${goodCity.state}`;
  console.log(citySearch);


  if (validName && goodCity) {
    const resp2 = await WeatherService.getWeather(citySearch);
    const newCity = processWeatherData(resp2);
    console.log(newCity);
    setCities([...cities, newCity]);
    setCityName('');
  } else {
    alert('Please Enter Valid City Name!')
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