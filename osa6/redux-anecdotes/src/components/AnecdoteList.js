import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setMessage, removeMessage } from "../reducers/messageReducer"

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
    .sort((a, b) => b.votes - a.votes)
    .filter(n=>n.content.toLowerCase().includes(filter.toLowerCase()))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const id = anecdote.id
    dispatch({ type: 'VOTE', data: { id } })
    console.log('vote', id)
    dispatch(setMessage(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeMessage()), 5000)
  }
  return (anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ))
}
export default AnecdoteList