import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import ForecastItem from './ForecastItem';
import getUrlForecastByCity from '../services/getUrlForecastByCity';
import transformForecast from '../services/transformForecast';

class ForecastExtended extends Component {

    constructor() {
        super();
        this.state = { forecastData: null }
    }

    componentDidMount() {
        this.updateCity(this.props.city);
    }

    componentWillReceiveProps = (nextProps) => {
      if (nextProps.city !== this.props.city) {
          this.setState({forecastData: null})
          this.updateCity(nextProps.city);
      }
    }
    

    updateCity = city => {
        fetch(getUrlForecastByCity(city))
             .then( data => data.json())
             .then( weatherData => {
                 const forecastData = transformForecast(weatherData);
                 this.setState({forecastData })
             });
    }
    

    renderForecastItemDays(forecastData) {
       return forecastData.map( forecast => (
                <ForecastItem 
                    key={`${forecast.weekDay}${forecast.hour}`}
                    weekDay={forecast.weekDay} 
                    hour={forecast.hour} 
                    data={forecast.data} >
                </ForecastItem>) );
    }

    renderProgress = () => {
        return <h3>Cargando pronostico extendido...</h3>;
    }

    render() {
        const { city } = this.props;
        const { forecastData } = this.state;
        return (
            <div>
                <h2 className='forecast-title' >Pronostico extendido {city}</h2>
                {forecastData ? 
                    this.renderForecastItemDays(forecastData) :
                    this.renderProgress() }
            </div>
        );
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}

export default ForecastExtended;