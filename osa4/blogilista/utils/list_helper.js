const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const blogLikes = blogs.map(n => n.likes)


  return blogLikes.reduce((a, b) => a + b)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((a, b) => a.likes > b.likes ? a : b)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}
const uniqueAuthors = (blogs) => {
  let filtered = []
  for (const n of blogs.map(n => n.author)) {
    filtered = filtered.includes(n)
      ? filtered
      : filtered.concat(n)
  }
  return filtered
}
const mostBlogs = (blogs) => {
  const names = uniqueAuthors(blogs)
  const books = names.map(n => {
    return blogs.filter(blog => blog.author === n).length
  })
  console.log(books)
  const namesAndBooks = names
    .map((a, i) => {
      return { author: a, books: books[i] }
    })
  console.log(namesAndBooks)
  const mostBlogger = namesAndBooks.reduce((a, b) => a.books > b.books ? a : b)
  return ({
    author: mostBlogger.author,
    blogs: mostBlogger.books
  })
}
const mostLikes = (blogs) => {
  const names = uniqueAuthors(blogs)
  const likes = names.map(n => {
    return blogs
      .filter(blog => blog.author === n)
      .map(n => n.likes)
  })
  const namesAndLikes = names
    .map((a, i) => {
      return { author: a, likes: likes[i].reduce((a, b) => a + b) }
    })
  console.log(namesAndLikes)
  const mostestBlogger = namesAndLikes.reduce((a, b) => a.likes > b.likes ? a : b)
  return ({
    author: mostestBlogger.author,
    likes: mostestBlogger.likes
  })
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
