import React from 'react'
import db from '../services/db'
const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons, setInfoMessage }) => {
    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        }
        const person = persons.find(n => n.name === newName)
        if (person !== undefined) {
            if (window.confirm(
                `${newName} is already added to phonebook, 
                replace the old number with a new one?`
            )) {
                db.update(person.id, { ...person, number: newNumber })
                    .then((updated) => {
                        setPersons(persons.map(n => n.id !== person.id ? n : updated))
                        setNewName('')
                        setNewNumber('')
                        setInfoMessage(
                            {
                                message: `Updated ${person.name}`,
                                color: 'green'
                            }
                        )
                        setTimeout(() => {
                            setInfoMessage({ message: null })
                        }, 3000)
                    })
                    .catch(error => {
                        setInfoMessage(
                            {
                                message: `Information of ${person.name} has already been removed from server`,
                                color: 'red'
                            }
                        )
                        setTimeout(() => {
                            setInfoMessage({ message: null })
                        }, 3000)
                    })
            }
        } else {
            db.create(nameObject)
                .then((returnedPerson) => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setInfoMessage(
                        {
                            message: `Added ${returnedPerson.name}`,
                            color: 'green'
                        }
                    )
                    setTimeout(() => {
                        setInfoMessage({ message: null })
                    }, 3000)
                })
                .catch(error => {
                    setInfoMessage(
                        {
                            message: error.response.data,
                            color: 'red'
                        }
                    )
                    setTimeout(() => {
                        setInfoMessage({ message: null })
                    }, 3000)
                })
        }
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