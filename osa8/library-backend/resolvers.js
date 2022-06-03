const config = require('./utils/config')
const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = config.SECRET

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Book.find({}).populate('author')
      if (!args.genre) return (await Book.find({}).populate('author')).filter(book => book.author.name === args.author)
      if (!args.author) return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      return (await Book.find({ genres: { $in: [args.genre] } }).populate('author')).filter(book => book.author.name === args.author)
    },
    allAuthors: async () => {
      const authors = (await Author.find({})).map(async n => {
        const bookCount = await Book.countDocuments({ author: n._id })
        n.bookCount = bookCount
        return n
      })
      return authors
    },
    me: (root, args, { currentUser }) => currentUser
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let author = await Author.findOne({ name: args.author })
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const newBook = new Book({ ...args, author: author })
      try {
        await newBook.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.name })
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if (!author) return null
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch((e) => {
          throw new UserInputError(e.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'helloteam') {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription:{
    bookAdded:{
      subscribe:()=>pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}
module.exports = resolvers