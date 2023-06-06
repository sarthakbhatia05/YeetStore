// cartQueries.js
const cartModel = require('../../model/cartModel')

function getCartProducts(user) {
  const cartProducts = cartModel.findOne({user: user})
  return cartProducts
}

function createNewCart(user, item) {
  const result = new cartModel({user: user, items: item})
  return result
}

function removeFromCart(user, item) {
  const result = cartModel.updateOne(
      {user: user},
      {$pull: {items: {product: item.product}}},
  )
  return result
}

function emptyCartAfterOrder(user) {
  const result = cartModel.updateOne({user: user}, {$set: {items: []}})
  return result
}

module.exports = {getCartProducts, createNewCart,
  removeFromCart, emptyCartAfterOrder}
