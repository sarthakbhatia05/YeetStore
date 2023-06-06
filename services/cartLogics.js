/* eslint-disable guard-for-in */
const {createNewCart} = require('../db/queries/cartQueries')
const {saveNewModel} = require('../db/queries/saveNewModelQuery')
const {getProductsById} = require('../db/queries/productQueries')

function ifUserHasNoCart(user, item) {
  const newItem = createNewCart(user, item)
  return saveNewModel(newItem)
}

function addProductToCart(cartProducts, item) {
  const index = cartProducts.items.findIndex((productsIterator) =>
    productsIterator.product.equals(item.product))
      index !== -1 ?
      cartProducts.items[index].quantity += item.quantity :
      cartProducts.items.push(item)

      return saveNewModel(cartProducts)
}

async function getCartProductDetails(cartProducts) {
  const allProducts = []
  for (const item of cartProducts.items) {
    const productDetails = await getProductsById(item.product)
    allProducts.push(productDetails)
  }
  return allProducts
}

function getSubtotalOfCart(cartProducts, allProducts) {
  let totalPrice = 0
  for (const product in allProducts) {
    totalPrice += allProducts[product].price*
    cartProducts.items[product].quantity
  }
  return totalPrice
}

function findIndexOfProduct(cartProducts, product) {
  const index = cartProducts.items.findIndex((productsIterator) =>
    productsIterator.product.equals(product))

  return index
}
module.exports = {ifUserHasNoCart, addProductToCart,
  getCartProductDetails, getSubtotalOfCart, findIndexOfProduct}
