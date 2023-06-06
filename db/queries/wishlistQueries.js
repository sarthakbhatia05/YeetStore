const wishlistModel = require('../../model/wishlistModel')

function getWishlist(user) {
  const result = wishlistModel.findOne({user: user})
  return result
}

function deleteFromWishlist(user, productToRemove) {
  const result = wishlistModel.updateOne(
      {user: user},
      {$pull: {items: productToRemove}},
  )
  return result
}

function createNewWishlist(user, product) {
  const result = new wishlistModel({user: user, items: product})
  return result
}

module.exports = {getWishlist, deleteFromWishlist, createNewWishlist}
