const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  const token = jwt.sign(
    { id: user._id },
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )
  response
    .status(200)
    .send({ token, username: user.username, name: user.name,id:user._id })
})
module.exports = loginRouter