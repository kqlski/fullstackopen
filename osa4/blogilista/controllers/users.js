const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', (request, response, next) => {
  const body = request.body
  console.log(body.password, typeof body.password)
  if (!body.password || body.password.length < 3) {
    return response.status(400).json({ error: 'password needs to be at least 3 characters long' })
  }
  const saltRounds = 10
  bcrypt.hash(body.password, saltRounds)
    .then((result) => {
      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: result
      })
      user.save()
        .then((result) => response.json(result))
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

usersRouter.get('/', (request, response) => {
  User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1, likes: 1 })
    .then((result) => {
      response.json(result)
    })
})

module.exports = usersRouter