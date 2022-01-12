
export const setUser = (user) => {
  return dispatch => {
    dispatch({ type: 'SETUSER', data: user })
  }
}
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SETUSER':
      return action.data
    default:
      return state
  }
}

export default userReducer