import React, { useEffect } from 'react'
import Button from './Button'
import db from '../services/db'
const Persons =({persons, _filter,setPersons})=>{
  const remove =(person)=> {


    if(window.confirm(`Delele${person.name} ?`)){
      db.remove(person.id)
      .then(()=>{
        console.log(person)
         setPersons(persons.filter(n=>n!=person)) 
      })
  }
  }

    return (
      <div>
      {persons.filter(n=>n.name.toLowerCase().includes(_filter.toLowerCase())).map(n=>
        <p key={n.name}>{n.name} {n.number}<Button name='delete' handleClick={()=>remove(n)}/></p>)}
      </div>
    )
  }
export default Persons