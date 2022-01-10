const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.data.message
    case 'REMOVE':
      return ''
    default:
      return state
  }

}

export const setMessage = (message) => {
  return ({
    type: 'SET',
    data: {
      message
    }
  })
}
export const removeMessage = () => {
  return ({
    type: 'REMOVE'
  })
}

export default messageReducer