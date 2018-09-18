import { urlBaseWeather, apiKey } from "../constants/api_url";

const getUrlWeatherByCity = city => {

    return `${urlBaseWeather}?q=${city}&appid=${apiKey}`;
}

export default getUrlWeatherByCity;