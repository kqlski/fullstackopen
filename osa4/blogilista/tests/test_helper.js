const Blog = require('../models/blog')
const User = require('../models/user')

const blogsinDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(n => n.toJSON())
}

const initialBlogs = [{
  title: 'how to win at life',
  author: 'unknown',
  url: 'https://lmgtfy.app/?q=how+to+win+at+life',
  likes: 5
}]
const testUser = {
  username: 'test',
  password: 'test'
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(n => n.toJSON())
}

module.exports = {
  blogsinDb, initialBlogs, usersInDb, testUser
}