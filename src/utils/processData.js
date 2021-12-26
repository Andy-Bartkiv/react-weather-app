export default function processData(resp) {
    const time = new Date(Date.now() + (resp.data.timezone*1000));
    const dataObj = {
        country: resp.data.sys.country,
        temp: resp.data.main.temp,
        weather: resp.data.weather[0].main,
        icon: resp.data.weather[0].icon,
        offset: resp.data.timezone,
        time: time.toLocaleTimeString('en-GB', {timeZone: "UTC", hour: '2-digit', minute: '2-digit'}),
    }
    return dataObj;
}