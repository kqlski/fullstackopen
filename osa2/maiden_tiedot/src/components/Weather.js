import React, { useEffect } from "react";
import axios from "axios";

const Weather = ({ name, setWeather, weather }) => {
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        console.log('effect2');
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}&units=m`)
            .then(response => {
                console.log('fulfilled2');
                setWeather(response.data)
            })
    }, [])
    if (weather === undefined) return ('')
    return (
        <div>
            <h2>Weather in {name}</h2>
            <p> <b>temperature: </b>{weather.current.temperature} Celsius</p>
            <img src={weather.current.weather_icons} alt='' />
            <p><b>wind: </b>{weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather