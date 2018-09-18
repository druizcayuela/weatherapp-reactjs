import React, { Component } from 'react';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css'
import transformWeather from '../../services/transformWeather';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import getUrlWeatherByCity from '../../services/getUrlWeatherByCity';


class WeatherLocation extends Component {

    constructor(props) {
        super(props);
        const {city} = props;
        this.state = {
            city,
            data: null,
        };
    }

    componentDidUpdate(prevProps, prevState) {
       
    }

    componentDidMount() {
        this.handleUpdateClick();
    }
    
    

    handleUpdateClick = () => {
        const apiWeather = getUrlWeatherByCity(this.state.city);
        fetch(apiWeather).then( res => {
            return res.json();
        }).then(data => {
            const newWeather = transformWeather(data);
            this.setState({
                data: newWeather,
            });
        });
    }

    render(){
        const { onWeatherLocationClick } = this.props;
        const { city, data } = this.state;
        return (
            <div className="weatherLocationCont" onClick={onWeatherLocationClick} >
                <Location city={city} ></Location>
                {data ? 
                    <WeatherData data={data} ></WeatherData> :
                    <CircularProgress size={50}/>
                }
            </div>
        );
    }
}
WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func,
}
export default WeatherLocation;