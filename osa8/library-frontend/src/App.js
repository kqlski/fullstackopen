import { useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client =useApolloClient()
  const logout=()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  useEffect(()=>{
    const authToken = localStorage.getItem('bloglist-user-token')
    if(authToken){
      setToken(authToken)
    }
  },[])
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={()=>setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
            :
            <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommended show={page==='recommend'} />
      
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
