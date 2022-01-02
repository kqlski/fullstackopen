import React from 'react'
const Persons =({persons, filter})=>{
    return (
      <div>
      {persons.filter(n=>n.name.toLowerCase().includes(filter.toLowerCase())).map(n=>
        <p key={n.name}>{n.name} {n.number}</p>)}
      </div>
    )
  }
export default Persons