const Blog = require('../models/blog')
const blogsinDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(n => n.toJSON())
}
const initialBlogs = [{
  title: 'how to win at life',
  author: 'unknown',
  url: 'https://lmgtfy.app/?q=how+to+win+at+life',
  __v: 0
}]
module.exports = {
  blogsinDb, initialBlogs
}