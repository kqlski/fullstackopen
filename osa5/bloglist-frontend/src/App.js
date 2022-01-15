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
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { message, user, blogs, users } = useSelector(state => state)
  const blogFormRef = useRef()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  useEffect(() => {
    dispatch(initializeUsers())

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
  const UserPage = ({ user }) => {
    if (!user) {
      return null
    }
    return (
      <div>
        <h3>{user.username}</h3>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(n => <li key={n.id}><Link to={`/blogs/${n.id}`}>{n.title}</Link></li>)}
        </ul>
      </div >
    )
  }

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const userPage = matchUser
    ? users.find(n => n.id === matchUser.params.id)
    : null
  const blogPage = matchBlog
    ? blogs.find(n => n.id === matchBlog.params.id)
    : null

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

      <Routes>
        <Route path='/blogs/:id' element={<Blog className='blog' blog={blogPage} addLike={addLike} remove={removeBlog} userId={user.id} />} />
        <Route path='/users/:id' element={<UserPage user={userPage} />} />
        <Route path='/users' element={<div>
          <h3>Users</h3>
          <ul style={{ listStyleType: 'none' }}>
            {users.map(n => <li key={n.id}><Link to={`${n.id}`}>{n.username}</Link><span style={{ marginLeft: '5px' }}>{n.blogs.length} blogs</span></li>)}
          </ul>
        </div>} />
        <Route path='/' element={
          <div>
            {blogForm()}
            {blogs.map(blog =>
              <li key={blog.id}><Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link></li>
            )}
          </div>} />
      </Routes >
    </div >
  )
}

export default App
