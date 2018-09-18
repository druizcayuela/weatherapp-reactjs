import { urlBaseForecast, apiKey } from "../constants/api_url";

const getUrlForecastByCity = city => {

    return `${urlBaseForecast}?q=${city}&appid=${apiKey}`;
}

export default getUrlForecastByCity;