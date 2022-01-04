const config = require('./utils/config')
const express = require('express')
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

module.exports=app