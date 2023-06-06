const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemas} = require('../constant-strings')

const CartSchema = new Schema({
  user: {
    type: String,
    required: true,
    ref: 'User',
  },
  items: [
    {
      product: {type: Schema.Types.ObjectId, ref: 'Product'},
      quantity: {type: Number},
    },
  ],
},
{
  timestamps: true,
})

const cart = mongoose.model(schemas.cart_schema, CartSchema)

module.exports = cart
