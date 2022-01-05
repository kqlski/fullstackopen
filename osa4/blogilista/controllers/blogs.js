const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes
      ? request.body.likes
      : 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})
blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body
  const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.json(updated)
})
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter