const cartDB = require('../db/schemas/cartSchema')
const {getCartProducts, removeFromCart} = require('../db/queries/cartQueries')
const {saveNewModel} = require('../db/queries/saveNewModelQuery')


const {ifUserHasNoCart, addProductToCart,
  getCartProductDetails, getSubtotalOfCart,
  findIndexOfProduct} = require('../services/cartLogics')

async function addToCart(req, res, next) {
  try {
    const {user, item} = cartDB(req, res)
    const cartProducts = await getCartProducts(user)
    if (!cartProducts) {
      await ifUserHasNoCart(user, item)
      res.redirect('/cart')
    } else {
      await addProductToCart(cartProducts, item)
      res.redirect('/cart')
    }
  } catch (err) {
    next(err)
  }
}

async function showCart(req, res, next) {
  try {
    const {user} = cartDB(req, res)
    const cartProducts = await getCartProducts(user)
    if (!cartProducts) {
      await ifUserHasNoCart(user, [])
      res.redirect('/cart')
    }
    const allProducts = await getCartProductDetails(cartProducts)
    const totalPrice = await getSubtotalOfCart(cartProducts, allProducts)
    res.render('myCart',
        {cart: cartProducts,
          product: allProducts, total: totalPrice.toLocaleString('en-US')})
  } catch (err) {
    next(err)
  }
}

async function deleteItem(req, res, next) {
  try {
    const {user, item} = cartDB(req, res)
    await removeFromCart(user, item)
    res.redirect('/cart')
  } catch (err) {
    next(err)
  }
}

async function changeQty(req, res, next) {
  try {
    const {user, item} = cartDB(req, res)
    const product = item.product
    const cartProducts = await getCartProducts(user)
    const index = findIndexOfProduct(cartProducts, product)
    const change = req.query.change
    change === 'increment' ? cartProducts.items[index].quantity += 1 :
    cartProducts.items[index].quantity -= 1

    await saveNewModel(cartProducts)
    res.redirect('/cart')
  } catch (err) {
    next(err)
  }
}


module.exports = {addToCart, showCart, deleteItem, changeQty}
