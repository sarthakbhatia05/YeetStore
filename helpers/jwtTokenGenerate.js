const jwt = require('jsonwebtoken')

function generateToken(res, email) {
  const token = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: parseInt(process.env.TOKEN_EXPIRY_TIME),
  })
  return res.cookie(process.env.COOKIE_NAME, token, {
    expires: parseInt(process.env.COOKIE_EXPIRY_TIME),
    secure: false,
    httpOnly: true,
  })
}

module.exports = generateToken
