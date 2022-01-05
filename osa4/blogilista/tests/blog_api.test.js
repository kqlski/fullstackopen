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
  const addedBlog = response.body
  const blogsInEnd = await helper.blogsinDb()
  expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(addedBlog).toEqual(JSON.parse(JSON.stringify({ ...newBlog, id: addedBlog.id })))
})

test('creating a blog without likes', async () => {
  const noLikesBlog = {
    title: 'NickALive!',
    author: 'unknown',
    url: 'http://www.nickalive.net/',
  }
  const response = await api
    .post('/api/blogs')
    .send(noLikesBlog)
    .expect(201)
  expect(response.body.likes).toEqual(0)
})

test('creating a blog without title or url should not work', async () => {
  const whatBlogIsThis = {
    author: 'Spongebob Squarepants',
    likes: Number.MAX_SAFE_INTEGER
  }
  await api
    .post('/api/blogs')
    .send(whatBlogIsThis)
    .expect(400)
  const blogsInEnd = await helper.blogsinDb()
  expect(blogsInEnd).toHaveLength(helper.initialBlogs.length)
})

test('removing a blog from the list', async () => {
  const blogs = await helper.blogsinDb()
  const removeId = blogs[0].id
  await api
    .delete(`/api/blogs/${removeId}`)
    .expect(204)
  const blogsInEnd = await helper.blogsinDb()
  expect(blogsInEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('update a blog', async () => {
  const blogs = await helper.blogsinDb()
  const updated = {
    ...blogs[0],
    likes: 1337
  }
  const id = updated.id
  await api
    .put(`/api/blogs/${id}`)
    .send(updated)
    .expect(200)
  const newAndImproved = await Blog.findById(id)
  console.log(newAndImproved)
  expect(newAndImproved.likes).toEqual(updated.likes)
})

afterAll(() => {
  mongoose.connection.close()
})