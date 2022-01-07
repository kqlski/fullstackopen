import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ message: null, color: null })
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const existingToken = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
    if (existingToken) {
      setUser(existingToken)
      blogService.setToken(existingToken)
    }

  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`username ${username} password ${password}`)
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user.token)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage({ message: 'login succesful', color: 'green' })
      setTimeout(() => {
        setMessage({ message: null })
      }, 3000);
    } catch (exception) {
      setMessage({ message: 'wrong username/password', color: 'red' })
      setTimeout(() => {
        setMessage({ message: null })
      }, 5000);
    }
  }

  const handleBlog = async (event) => {
    event.preventDefault()
    blogService.createBlog({ title, author, url })
      .then(response => {
        setBlogs(blogs.concat(response))
        setMessage({ message: `a new blog ${title} by ${author} added`, color: 'green' })
        setTimeout(() => {
          setMessage({ message: null })
        }, 3000);
      })
      .catch(result => {
        console.log(result)
        setMessage({ message: `adding blog failed, title and url are required fields.`, color: 'red' })
        setTimeout(() => {
          setMessage({ message: null })
        }, 3000);
      })


  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)

    setMessage({ message: 'you logged yourself out', color: 'green' })
    setTimeout(() => {
      setMessage({ message: null })
    }, 3000);
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message.message} color={message.color} />
        <form onSubmit={handleLogin}>
          <div>
            <label> username
              <input type='username' value={username} onChange={({ target }) => setUsername(target.value)} />
            </label>
          </div>
          <div>
            <label>
              password
              <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
            </label>
          </div>
          <button type='submit'>login</button>
        </form>

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.message} color={message.color} />
      {user.name} logged in<button type='button' onClick={logout}>logout</button>
      <h3>create new</h3>
      <form onSubmit={handleBlog}>
        <div>
          <label> title:
            <input value={title} onChange={({ target }) => setTitle(target.value)} required />
          </label>
        </div>
        <div>
          <label> author:
            <input value={author} onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div> <div>
          <label> url:
            <input value={url} onChange={({ target }) => setUrl(target.value)} required />
          </label>
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App