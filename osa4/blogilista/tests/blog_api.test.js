const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the right amount of blogs returned', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body)
  expect(response.body).toHaveLength(1)
})

test('returns the blog id as \'id\' rather than \'_id\'', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('create new blog properly that changes database size', async () => {
  const blogsAtStart = await helper.blogsinDb()
  const newBlog = {
    title: 'life of Patrick',
    author: 'Patrick',
    url: 'https://en.wikipedia.org/wiki/Patrick_Star',
    likes: 5
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const addedBlog =response.body
  const blogsInEnd = await helper.blogsinDb()
  expect(blogsInEnd).toHaveLength(blogsAtStart.length + 1)
  expect(addedBlog).toEqual(JSON.parse(JSON.stringify({ ...newBlog, id: addedBlog.id })))
})

afterAll(() => {
  mongoose.connection.close()
})