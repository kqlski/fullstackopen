import React from "react";
import Button from "./Button";
import Weather from "./Weather";

const Languages = ({ languages }) => {
    return (
        Object.entries(languages).map(n => <li key={n[0]}>{n[1]}</li>)
    )
}
const Display = ({ data, _filter, setFilter, weather, setCityName }) => {

    const filteredData = data
        .filter(n => n.name.common.toLowerCase().includes(_filter.toLowerCase()))
        const name = filteredData.find(n=> n.name.common.toLowerCase()===_filter.toLowerCase())
        if(name!==undefined){
            console.log('works')
            const country = name
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h2>languages</h2>
                <ul>
                    <Languages languages={country.languages} />
                </ul>
                <img src={country.flags.svg} alt="flag" width="200" />
                <Weather weather={weather} name={country.capital} setCityName={setCityName}/>
            </div>
        )
        }
    if (filteredData.length > 10) return ('Too many matches, specify another filter')
    if (filteredData.length === 1) {

        const country = filteredData[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h2>languages</h2>
                <ul>
                    <Languages languages={country.languages} />
                </ul>
                <img src={country.flags.svg} alt="flag" width="200" />
                <Weather weather={weather} name={country.capital} setCityName={setCityName}/>
            </div>
        )
    }


    return (
        <div>
            {filteredData
                .map(n =>
                    <p key={n.name.common}>
                        {n.name.common}
                        <Button name='show' handleClick={() => setFilter(n.name.common)} />
                    </p>
                )}
        </div>
    )
}


export default Display