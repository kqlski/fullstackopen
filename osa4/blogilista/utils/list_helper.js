const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const blogLikes = blogs.map(n => n.likes)


  return blogLikes.reduce((a, b) => a + b)
}

module.exports = { dummy, totalLikes }