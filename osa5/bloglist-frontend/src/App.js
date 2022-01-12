import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/messageReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { message, user, blogs } = useSelector(state => state)
  const blogFormRef = useRef()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  useEffect(() => {
    const existingUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
    if (existingUser) {
      dispatch(setUser(existingUser))
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
      dispatch(setUser(user))
      dispatch(setNotification({ message: 'login succesful', color: 'green' }, 5))
    } catch (exception) {
      dispatch(setNotification({ message: 'wrong username/password', color: 'red' }, 5))
    }
  }

  const handleBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blog))
      dispatch(setNotification({ message: `a new blog ${blog.title} by ${blog.author} added`, color: 'green' }, 5))
    } catch (erreur) {
      console.log(erreur)
      dispatch(setNotification({ message: 'adding blog failed, title and url are required fields.', color: 'red' }, 5))
    }
  }
  const addLike = (blog) => {
    console.log(blogs)
    dispatch(likeBlog(blog))
  }
  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog))
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={handleBlog} />
    </Togglable>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setUser(null))

    dispatch(setNotification({ message: 'you logged yourself out', color: 'green' }, 5))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message.message} color={message.color} />
        <form onSubmit={handleLogin}>
          <div>
            <label> username
              <input id='username' type='username' value={username} onChange={({ target }) => setUsername(target.value)} />
            </label>
          </div>
          <div>
            <label>
              password
              <input id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
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
      {blogs.map(blog =>
        <Blog className='blog' key={blog.id} blog={blog} addLike={addLike} remove={removeBlog} userId={user.id} />
      )}
    </div>
  )
}

export default App
