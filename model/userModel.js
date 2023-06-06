const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemas} = require('../constant-strings')
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  fullname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  information: {
    phone: {
      type: Number,
    },
    address: [
      {
        country: {
          type: String,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        pincode: {
          type: Number,
          required: true,
        },
      },
    ],
  },
},
{
  timestamps: true,
})

UserSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(9)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const user = mongoose.model(schemas.user_schema, UserSchema)

module.exports = user
