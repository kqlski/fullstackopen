import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import db from './services/db'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [_filter, setFilter] = useState('')
  
  useEffect(()=>{
    console.log('effect');
    db.getAll()
      .then(persons=>{
       console.log('fulfilled'); 
       console.log(persons)
       setPersons(persons)
      })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter _filter={_filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} _filter={_filter} setPersons={setPersons} />
    </div>
  )

}

export default App