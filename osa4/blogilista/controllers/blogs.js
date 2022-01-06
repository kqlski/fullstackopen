const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
      ? body.likes
      : 0,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body
  const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.json(updated)
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const userId = request.user.id
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(204).end()
  if (!(blog.user.toString() === userId)) {
    return response.status(401).json({ error: 'invalid user' })
  }
  await blog.remove()
  return response.status(204).end()
})

module.exports = blogsRouter
