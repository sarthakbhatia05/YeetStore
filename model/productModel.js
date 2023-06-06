const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemas} = require('../constant-strings')


const reviewSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
})
const ProductSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: Array,
  },
  options: {
    type: Array,
  },
  description: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
    default: 0,
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  reviews: [reviewSchema],
  reviewCount: {
    type: Number,
    default: 0,
  },
  stockCount: {
    type: Number,
    require: true,
    default: 1,
  },
  category: {
    type: String,
    require: true,
  },
},
{
  timestamps: true,
})


const product = mongoose.model(schemas.product_schema, ProductSchema)

module.exports = product
