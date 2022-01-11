import anecdoteService from "../services/anecdotes"

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({ type: 'CREATE', data: newAnecdote })
  }
}

export const iniliatizeAnecdotes = anecdotes => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT', data: anecdotes })
  }
}
export const addVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({ type: 'VOTE', data: updatedAnecdote })
  }
}
const reducer = (state = [], action) => {

  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteById = state.find(n => n.id === id)
      const newAnecdote = { ...anecdoteById, votes: anecdoteById.votes + 1 }
      return state.map(n => n.id !== id ? n : newAnecdote)
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default reducer