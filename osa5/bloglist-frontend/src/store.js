import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
const reducer = combineReducers({
  message: messageReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store