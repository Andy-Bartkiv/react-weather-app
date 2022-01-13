const forecastToDisplay = (i, city) => {
    let res = {};
    
    const toLocal = (time) => new Date(1000*(time + city.offset));
    const tlds2 = (t) => t.toLocaleDateString('en-US', { timeZone: "UTC", weekday: 'short', month: 'short', day: '2-digit' })    
    
    const date = new Date(Date.now() + (city.offset*1000) + 86400000*i);

    const oneDayForecast = city.forecast
        .filter( ts => 
            toLocal(ts.dt).getUTCDate() === date.getUTCDate() )
        .filter( ts => 
            [2, 3, 4, 14, 15, 16].includes(toLocal(ts.dt).getUTCHours()) )
    if (i === 0) {
        res.title = `Today`;
        res.icons = (oneDayForecast.length === 2)
            ? oneDayForecast.map(odf => odf.weather[0].icon)
            : (oneDayForecast.length === 1)
                ? [city.icon, oneDayForecast[0].weather[0].icon]
                : [city.icon, city.forecast[0].weather[0].icon];
        res.temps = (oneDayForecast.length === 2)
            ? oneDayForecast.map(odf => odf.main.temp)
            : (oneDayForecast.length === 1)
                ? [city.temp, oneDayForecast[0].main.temp]
                : [city.temp, city.forecast[0].main.temp];
    } else {
        res = { 
            title: tlds2(date),
            icons: oneDayForecast.map(odf => odf.weather[0].icon),
            temps: oneDayForecast.map(odf => odf.main.temp),
        }
    }
    return res; 
}

export default forecastToDisplay;