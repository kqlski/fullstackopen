const config = require('./utils/config')
const http = require('http')
const express = require('express')
const blogsRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


mongoose.connect(config.MONGODB_URI)
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})