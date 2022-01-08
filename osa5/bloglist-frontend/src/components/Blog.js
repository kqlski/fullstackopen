import React, { useState } from 'react'
const Blog = ({ blog, addLike, remove, userId }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLike = () => {
    addLike({ ...blog, likes: likes })
    setLikes(likes + 1)
  }
  const handleRemove = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) remove(blog)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user ? blog.user.name : null}</div>
        {blog.user === userId || blog.user.id === userId ? <button onClick={handleRemove}>remove</button> : null}
      </div>
    </div >
  )
}

export default Blog