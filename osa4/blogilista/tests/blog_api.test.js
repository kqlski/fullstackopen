const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let tokenString = ''

describe('blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const testUser = await api
      .post('/api/users')
      .send(helper.testUser)
    const res = await api
      .post('/api/login')
      .send(helper.testUser)
    tokenString = `Bearer ${res.body.token}`
    await Blog.insertMany(helper.initialBlogs.map(n => ({ ...n, user: testUser.body.id })))
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
    console.log(tokenString)
    const response = await api
      .post('/api/blogs')
      .set('Authorization', tokenString)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const addedBlog = response.body
    const blogsInEnd = await helper.blogsinDb()
    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(addedBlog).toEqual(JSON.parse(JSON.stringify({ ...newBlog, id: addedBlog.id, user: addedBlog.user })))
  })

  test('creating a blog without likes', async () => {
    const noLikesBlog = {
      title: 'NickALive!',
      author: 'unknown',
      url: 'http://www.nickalive.net/',
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', tokenString)
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
      .set('Authorization', tokenString)
      .send(whatBlogIsThis)
      .expect(400)
    const blogsInEnd = await helper.blogsinDb()
    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('removing a blog from the list', async () => {
    const blogs = await helper.blogsinDb()
    console.log(blogs)
    const removeId = blogs[0].id
    await api
      .delete(`/api/blogs/${removeId}`)
      .set('Authorization', tokenString)
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
})


describe('users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('adding a user', async () => {
    const newUser = {
      username: 'Matti',
      password: 'Teppo'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
    const users = await helper.usersInDb()
    expect(users).toHaveLength(1)
  })
  test('adding a user with no/too short password', async () => {
    const BadNewUser = {
      username: 'Matti'
    }
    const BadUser = {
      username: 'Matti',
      password: '12'
    }
    const result1 = await api
      .post('/api/users')
      .send(BadNewUser)
      .expect(400)
    expect(result1.body.error).toContain('password needs to be at least 3 characters long')
    const result2 = await api
      .post('/api/users')
      .send(BadUser)
      .expect(400)
    expect(result2.body.error).toContain('password needs to be at least 3 characters long')
    const users = await helper.usersInDb()
    expect(users).toHaveLength(0)
  })
  test('adding a user with no username', async () => {
    const noUserNameUser = {
      password: '123456'
    }
    const result = await api
      .post('/api/users')
      .send(noUserNameUser)
      .expect(400)
    expect(result.body.error).toContain('`username` is required')
  })

  test('create new blog without token', async () => {
    const newBlog = {
      title: 'life of Patrick',
      author: 'Patrick',
      url: 'https://en.wikipedia.org/wiki/Patrick_Star',
      likes: 5
    }
    console.log(tokenString)
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    const blogsInEnd = await helper.blogsinDb()
    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length)
  })

})
afterAll(() => {
  mongoose.connection.close()
})