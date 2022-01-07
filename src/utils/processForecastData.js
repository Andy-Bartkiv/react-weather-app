export default function processForecastData(resp) {
    const city = resp.data;
    const cityObj = {
        forecast: city.list,
    }
    return cityObj;
}