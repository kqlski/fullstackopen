import React from 'react'
const PersonForm = ({newName, setNewName,newNumber,setNewNumber,persons,setPersons}) => {
    const addName = (event) => {
        if (persons.find(n => n.name === newName)) {
          return alert(`${newName} is already added to phonebook`)
        }
        event.preventDefault()
        const nameObject = {
          name: newName,
          number: newNumber
        }
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
      }
    return (
    <form onSubmit={addName}>
        <div>
            name: <input
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
            />
        </div>
        <div>number: <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
        /></div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}
export default PersonForm