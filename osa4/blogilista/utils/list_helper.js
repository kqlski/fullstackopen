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

const mostBlogs = (blogs) => {
  const uniqueAuthors = () => {
    let filtered = []
    for (const n of blogs.map(n => n.author)) {
      filtered = filtered.includes(n)
        ? filtered
        : filtered.concat(n)
    }
    return filtered
  }
  const names = uniqueAuthors()
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
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
