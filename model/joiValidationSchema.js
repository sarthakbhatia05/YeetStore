const Joi = require('joi')

const loginAuthSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
})

const signUpAuthSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
  isAdmin: Joi.boolean(),
})


module.exports = {loginAuthSchema, signUpAuthSchema}
