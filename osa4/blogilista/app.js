const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info('connecting to MongoDB')
mongoose.connect(config.MONGODB_URI)
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)
module.exports = app