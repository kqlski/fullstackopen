const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)
const Blog = require('../models/blog')
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

afterAll(() => {
  mongoose.connection.close()
})