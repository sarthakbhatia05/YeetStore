const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemas} = require('../constant-strings')


const OrderSchema = new Schema({
  user: {
    type: String,
    required: true,
    ref: 'User',
  },
  items: [{
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number, required: true, default: 1},
  }],
  status: {type: String, enum: ['pending', 'placed','completed', 'cancelled'], default: 'pending'},
  shippingAdress: {
    country: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    pincode: {type: Number, required: true},

  },
  phone: {type: Number, required: true},
  paymentMethod: {
    type: String,
    required: true,
    default: 'Cash On Delievery',
  },
},
{
  timestamps: true,
})

const order = mongoose.model(schemas.order_schema, OrderSchema)

module.exports = order
