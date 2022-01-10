import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label>title:
            <input id='title' value={newTitle} onChange={({ target }) => setNewTitle(target.value)} required />
          </label>
        </div>
        <div>
          <label>author:
            <input id='author' value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>url:
            <input id='url' value={newUrl} onChange={({ target }) => setNewUrl(target.value)} required />
          </label>
        </div>
        <button id='submit' type='submit'>create</button>
      </form>
    </div>

  )

}

export default BlogForm