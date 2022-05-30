const config = require('./utils/config')
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = config.MONGODB_URI
const JWT_SECRET = config.SECRET

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then((res) => {
    console.log('connected to MongoDB');
  })
  .catch((e) => {
    console.log('error connecting to MongoDB:', e.message);
  })

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/
const typeDefs = gql`
  type Author {
    name:String!
    born:Int
    bookCount:Int
    id:ID!
  }

  type Book{
    title:String!
    published:Int!
    author:Author!
    genres:[String!]!
    id:ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    bookCount:Int!
    authorCount:Int!
    allBooks(author:String,genre:String):[Book!]
    allAuthors:[Author!]
    me: User
  }
  
  type Mutation {
    addBook(
      title:String!
      author:String!
      published:Int!
      genres:[String]!
    ):Book
    editAuthor(
      name:String!
      setBornTo:Int!
      ):Author
    createUser(
      username: String!
      favoriteGenre: String!
      ): User
    login(
      username: String!
      password: String!
      ): Token
  }
`

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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})