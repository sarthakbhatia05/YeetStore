/* eslint-disable guard-for-in */
const userInfo = require('../db/schemas/UserInfoSchema')
const {productInfo} = require('../db/schemas/productSchema')

const {getWishlist, deleteFromWishlist, createNewWishlist} = require('../db/queries/wishlistQueries')

const {ifUserHasNoWishlist, getWishlistProductDetails, addItemsToWishlist} = require('../services/wishlistLogics')



async function fetchWishlist(req, res, next) {
  try {
    const {user} = userInfo(req, res)
    const userWishlist = await getWishlist(user)
    if (!userWishlist) {
      res.redirect('back')
      await ifUserHasNoWishlist(user, [])
    }
    const getProducts = await getWishlistProductDetails(userWishlist)
    res.render('wishlist', {product: getProducts})
  } catch (err) {
    next(err)
  }
}

async function addToWishlist(req, res, next) {
  try {
    const {user} = userInfo(req, res)
    const {product} = productInfo(req, res)
    const userWishlist = await getWishlist(user)
    if (!userWishlist) {
      await ifUserHasNoWishlist(user, [product])
      res.redirect('back')
    } else {
      addItemsToWishlist(res, userWishlist, product)
    }
  } catch (err) {
    next(err)
  }
}

async function deleteItem(req, res, next) {
  try {
    const {user} = userInfo(req, res)
    const {product} = productInfo(req, res)
    await deleteFromWishlist(user, product)
    res.redirect('/wishlist')
  } catch (err) {
    next(err)
  }
}

module.exports = {addToWishlist, fetchWishlist, deleteItem}
