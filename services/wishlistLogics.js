const {createNewWishlist} = require('../db/queries/wishlistQueries')
const {saveNewModel} = require('../db/queries/saveNewModelQuery')
const {getProductsById} = require('../db/queries/productQueries')
const {errors} = require('../constant-strings')

function ifUserHasNoWishlist(user, product) {
  const newItem = createNewWishlist(user, product)
  saveNewModel(newItem)
}

async function getWishlistProductDetails(userWishlist) {
  const getProducts = []
  for (const item of userWishlist.items) {
    const productDetails = await getProductsById(item)
    getProducts.push(productDetails)
  }
  return getProducts
}

function addItemsToWishlist(res, userWishlist, product) {
  if (userWishlist.items.includes(product)) {
    throw new Error(errors.alreadyInWishlist)
  } else {
    userWishlist.items.push(product)
    saveNewModel(userWishlist)
    res.redirect('back')
  }
}
module.exports = {ifUserHasNoWishlist,
  getWishlistProductDetails, addItemsToWishlist}
