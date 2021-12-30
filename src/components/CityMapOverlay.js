
const CityMapOverlay = ({ city, zoom, setMapCenter, setZoom }) => {
    const temp = ((city.temp > 0) ? '+' : '-') + `${Math.round(Math.abs(city.temp))}\u00b0C`;
    const fontSize = `max(.5em, ${1 - 1.5/zoom}em)`;

    return (
        <div style={{ 
            fontSize, fontWeight:'900', color:'#282c44', background:'#0888', cursor:'pointer',
            borderRadius:'.5em', display:'flex', alignItems:'center', padding:'.25em', gap:'.5em'}}
            onClick={ () => {
                setMapCenter([city.coord.lat, city.coord.lon]);
                setZoom((zoom <= 5) ? zoom+1 : zoom-1);
            }} 
        >
            <div>{city.name}</div>
            { city.icon &&
                <img 
                    style={{ height: '1em', transform: 'scale(2)' }}
                    src={`http://openweathermap.org/img/w/${city.icon}.png`} 
                    alt={`${city.weather}`}
                />
            }
            <div>{city.temp && temp}</div>
        </div>
    )
}

export default CityMapOverlay
