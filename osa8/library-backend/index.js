const config = require('./utils/config')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const express = require('express')
const http = require('http')

const jwt = require('jsonwebtoken')
const JWT_SECRET = config.SECRET

const mongoose = require('mongoose')
const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')


const MONGODB_URI = config.MONGODB_URI

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
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const subServer=SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe
    },
    {
      server:httpServer,
      path:''
    }
  )
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodeToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodeToken.id)
        return { currentUser }
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart(){
        return{
          async drainServer(){
            subServer.close()
          }
        }
      }
    }
    ]
  })
  await server.start()
  server.applyMiddleware({
    app,
    path: '/'
  })
  const PORT = 4000
  
  httpServer.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
  })
}

start()