import React from 'react'
import Note from './components/Note'



const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(n=>
          <Note key={n.id} note={n} />
          )}
      </ul>
    </div>
  )
}

export default App