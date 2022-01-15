import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (newtoken) => {
  token = `bearer ${newtoken}`
}
const createBlog = (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(config)
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}
export const createComment = (comment, id, blogs, setComment) => {
  console.log(comment)
  const request = axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.then(response => {
    if (response.status === 200) {
      setComment(blogs.concat(comment))
    }
    return response.data
  })
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const update = (updatedBlog) => {
  const userId = updatedBlog.user.id
  const request = axios.put(`${baseUrl}/${updatedBlog.id}`, { ...updatedBlog, user: userId })
  return request.then(response => response.data)
}
const remove = (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const blogId = blog.id
  const request = axios.delete(`${baseUrl}/${blogId}`, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog, update, remove }