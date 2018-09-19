import getUrlForecastByCity from "../services/getUrlForecastByCity";
import getUrlWeatherByCity from "../services/getUrlWeatherByCity";
import transformForecast from "../services/transformForecast";
import transformWeather from "../services/transformWeather";


export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';
export const GET_WEATHER_CITY = 'GET_WEATHER_CITY';
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY';

export const setCity = payload => ({type: SET_CITY, payload});
export const setForescatData = payload => ({type: SET_FORECAST_DATA, payload});

export const getWeatherCity = payload => ({type: GET_WEATHER_CITY, payload});
export const setWeatherCity = payload => ({type: SET_WEATHER_CITY, payload});


export const setSelectedCity = payload => {
    return (dispatch, getState) => {

        // Activar en el estado un indicador de busqueda de datos
        dispatch(setCity(payload));

        const state = getState();
        const date = state.cities[payload] && state.cities[payload].forecastDataDate;

        const now = new Date();

        if (date && (now - date) < 1 * 60 * 1000) {
            return;
        }


        return fetch(getUrlForecastByCity(payload))
                    .then( data => data.json())
                    .then( weatherData => {
                        const forecastData = transformForecast(weatherData);
                        // modificar el estado con el resultado de la promise (fetch)
                        dispatch(setForescatData({city: payload, forecastData}));
                    });
    };
};

export const setWeather = payload => {

    return dispatch => {
        payload.forEach(city => {

            dispatch(getWeatherCity(city));

            const apiWeather = getUrlWeatherByCity(city);
            fetch(apiWeather).then( res => {
                return res.json();
            }).then(weather_data => {
                const weather = transformWeather(weather_data);
                
                dispatch(setWeatherCity({city, weather}));
            });
        });
    }
}