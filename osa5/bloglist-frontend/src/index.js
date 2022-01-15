import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Link } from 'react-router-dom'
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to='/' ><button type='button'>home</button></Link>
        <Link to='/users' ><button type='button'>users</button></Link>
      </nav>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))