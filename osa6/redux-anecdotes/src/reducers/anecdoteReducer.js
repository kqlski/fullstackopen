



export const createAnecdote = content => {
  return { data: content, type: 'CREATE' }
}

export const iniliatizeAnecdotes = anecdotes => {
  return {
    type: 'INIT',
    data: anecdotes
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