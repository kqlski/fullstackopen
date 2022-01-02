import React,{useEffect} from "react";

const Weather = ({ weather ,name,setCityName}) => {

    useEffect(() => {
        setCityName(name)
    })
    if (weather.length === 0) return ('')
    return (
        <div>
            <h2>Weather in {weather.location.name}</h2>
            <p> <b>temperature: </b>{weather.current.temperature} Celsius</p>
            <img src={weather.current.weather_icons} alt='' />
            <p><b>wind: </b>{weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather