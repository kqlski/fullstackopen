import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT', data: blogs })
  }
}
export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blog)
    dispatch({ type: 'CREATE', data: newBlog })
  }
}
export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({ type: 'LIKE', data: blog })
  }
}
export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({ type: 'DELET THIS', data: blog })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'CREATE':
      return state.concat(action.data)
    case 'LIKE':
      return state.map(n => n.id !== action.data.id
        ? n
        : { ...n, likes: n.likes + 1 }
      ).sort((a, b) => b.likes - a.likes)
    case 'DELET THIS':
      return state.filter(n => n.id !== action.data.id)
    default:
      return state
  }
}

export default blogReducer