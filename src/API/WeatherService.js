import axios from "axios";
import appid from "../data/appid";

export default class WeatherService {

    static async getWeather(name, units='metric') {
        const resposne = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: name,
                units,
                appid,
             }
        });
        return resposne;
    }

    static async getForecast(name, units='metric') {
        const resposne = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                q: name,
                units,
                appid,
             }
        });
        return resposne;
    }
    
    static async getGeo(name, limit = 5) {
        const resposne = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
            params: {
                q: name,
                limit,
                appid,
             }
        });
        return resposne;
    }
    
}

