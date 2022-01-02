import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Display from './components/Display'
import Filter from './components/Filter'
function App() {
  const [countries, setCountries] = useState([])
  const [_filter, setFilter] = useState('')
  const [weather, setWeather] = useState([])
  const [cityName, setCityName] = useState('')
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    console.log('effect2');
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${cityName}&units=m`)
      .then(response => {
        console.log('fulfilled2')
        if (response.data.success === false) {
          console.log(false);
        } else setWeather(response.data)
      })
  }, [cityName])
  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('fullfilled');
        setCountries(response.data)
      })
  }, [])


  return (
    <div>
      <Filter _filter={_filter} setFilter={setFilter} />
      <Display data={countries} _filter={_filter} setFilter={setFilter} weather={weather} setCityName={setCityName} />
    </div>
  );
}

export default App;
