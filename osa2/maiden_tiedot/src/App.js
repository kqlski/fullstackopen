import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Display from './components/Display'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [_filter, setFilter] = useState('')
  const [weather, setWeather]= useState(undefined)
  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('fullfilled');
        setCountries(response.data)
      })
  }, [])
  console.log(countries);
  console.log(weather);
  return (
    <div>
      <Filter _filter={_filter} setFilter={setFilter}/>
      <Display data={countries} _filter={_filter} setFilter={setFilter} weather={weather} setWeather={setWeather} />
    </div>
  );
}

export default App;
