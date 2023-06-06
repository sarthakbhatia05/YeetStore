const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

const verifyToken = async(req, res, next) => {
  const token = req.cookies.token || ''
  try {
    if (!token) {
      res.render('login', {isLogin: false})
    }
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    next()
  } catch (error) {
    next(error)
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.token
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        next()
      } else {
        const user = decodedToken.email
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}
module.exports = {verifyToken, checkUser}
