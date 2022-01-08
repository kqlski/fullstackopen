import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ message: null, color: null })
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const existingUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
    if (existingUser) {
      setUser(existingUser)
      blogService.setToken(existingUser.token)
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
      console.log(user)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
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

  const handleBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    blogService.createBlog(blog)
      .then(response => {
        console.log(response)
        setBlogs(blogs.concat(response))
        setMessage({ message: `a new blog ${blog.title} by ${blog.author} added`, color: 'green' })
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
  const addLike = (blog) => {
    blogService.update({ ...blog, likes: blog.likes + 1 })
  }
  const removeBlog = (blog) => {
    blogService.remove(blog)
      .then(response => {
        setBlogs(blogs.filter(n => n !== blog))
      })
      .catch(exception => {
        console.log(exception)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={handleBlog} />
    </Togglable>
  )

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
      <p>{user.name} logged in<button type='button' onClick={logout}>logout</button></p>
      {blogForm()}
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} remove={removeBlog} userId={user.id} />
      )}
    </div>
  )
}

export default App
