import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
const AnecdoteForm = (props) => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    // console.log('vote', id)
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote })(AnecdoteForm)