/* eslint-disable max-len */
const userModel = require('../model/userModel')
const {getUser} = require('../db/queries/userQueries')
const {loginAuthSchema, signUpAuthSchema} = require('../model/joiValidationSchema')
const createError = require('http-errors')
const generateToken = require('../helpers/jwtTokenGenerate')

const {errors} = require('../constant-strings')

async function signup(req, res, next) {
  try {
    const userData = await signUpAuthSchema.validateAsync(req.body)

    const DoesExist = await getUser(userData)
    if (DoesExist) {
      throw createError.Conflict(result.email + errors.userAlreadyRegistered)
    }
    const newUser = new userModel(userData)
    await newUser.save()

    res.redirect('/login')
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {
  try {
    const userData = await loginAuthSchema.validateAsync(req.body)
    const DoesExist = await getUser(userData.email)

    if (!DoesExist) throw createError.Unauthorized(errors.userNotRegistered)

    const isPasswordMatch = await DoesExist.isValidPassword(userData.password)
    if (!isPasswordMatch) {
      throw createError.Unauthorized(errors.wrongPassword)
    }
    await generateToken(res, DoesExist.email)
    if (DoesExist.isAdmin==true) {
      res.redirect('/admin/home')
    }
    res.redirect('/home')
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError.BadRequest(errors.invalidCredentials))
    }
    next(error)
  }
}

async function logout(req, res, next) {
  try {
    res.cookie(process.env.COOKIE_NAME, '', {maxAge: parseInt(process.env.COOKIE_MAX_AGE_FOR_LOGOUT)})
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

module.exports = {signup, login, logout}
