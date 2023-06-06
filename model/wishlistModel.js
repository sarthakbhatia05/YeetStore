const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemas} = require('../constant-strings')

const WishlistSchema = new Schema({
  user: {
    type: String,
    required: true,
    ref: 'User',
  },
  items: {
    type: Array,
    required: true,
    ref: 'Product',
  },
},
{
  timestamps: true,
})

const wishlist = mongoose.model(schemas.wishlist_schema, WishlistSchema)

module.exports = wishlist
