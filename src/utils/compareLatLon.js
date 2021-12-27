export default function compareLatLon([lat1, lon1], [lat2, lon2]) {
    return ( 
        (Math.floor(lat1*10) === Math.floor(lat2*10)) 
        && 
        (Math.floor(lon1*10) === Math.floor(lon2*10))
    )
}