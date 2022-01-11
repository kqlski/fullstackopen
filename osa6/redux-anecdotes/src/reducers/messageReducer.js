const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.message
    case 'REMOVE':
      return ''
    default:
      return state
  }

}
let prevTimeoutID;
export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({ type: 'SET', message })
    clearTimeout(prevTimeoutID)
    prevTimeoutID = setTimeout(() => dispatch({ type: 'REMOVE' }), time * 1000)
  }
}


export default messageReducer