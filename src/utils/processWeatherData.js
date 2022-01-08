export default function processWeatherData(resp) {
    const city = resp.data;
    const cityObj = {
        id: city.id,
        name: city.name,
        country: city.sys.country,
        coord: city.coord,
        offset: city.timezone,

        dt: city.dt,
        temp: city.main.temp,
        weather: city.weather[0].main,
        icon: city.weather[0].icon,

        humidity: city.main.humidity,
        pressure: (city.main.grnd_level) ? city.main.grnd_level : city.main.pressure,
        wind: city.wind,
    }
    return cityObj;
}