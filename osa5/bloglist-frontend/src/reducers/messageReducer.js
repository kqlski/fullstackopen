

const messageReducer = (state = { message: null, color: null }, action) => {
  switch (action.type) {
    case 'SET':
      return action.message
    case 'CLEAR':
      return { message: null, color: null }
    default:
      return state
  }
}
let timeoutID
export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({ type: 'SET', message })
    clearTimeout(timeoutID)
    setTimeout(() => dispatch({ type: 'CLEAR' }), time * 1000)
  }
}

export default messageReducer