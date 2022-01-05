import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context";

const TimeLocal = ({ offset=0 }) => {

    const { min } = useContext(DataContext);
    const currentTime = new Date(Date.now() + (offset*1000));
    const [time, setTime] = useState(currentTime);

    useEffect( () => setTime(new Date(Date.now() + (offset*1000))), [min]);

    return (
        <div>
            { time.toLocaleTimeString('en-GB', {timeZone: "UTC", hour: '2-digit', minute: '2-digit'}) }
        </div>
    )
}

export default TimeLocal
