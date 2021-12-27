export default function processWeatherData(resp) {
    const dataObj = {
        id: resp.data.id,
        name: resp.data.name,
        country: resp.data.sys.country,
        coord: { lon: resp.data.coord.lon, lat: resp.data.coord.lat },
        offset: resp.data.timezone,

        temp: resp.data.main.temp,
        weather: resp.data.weather[0].main,
        icon: resp.data.weather[0].icon,
    }
    return dataObj;
}