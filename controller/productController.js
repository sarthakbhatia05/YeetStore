/* eslint-disable require-jsdoc */
const {getProductsByCategory, getProductDetails, getSearchedProduct} = require('../db/queries/productQueries')
const {productInfo} = require('../db/schemas/productSchema')
const {sortResultsByPrice} = require('../services/productLogics')

async function fetchProduct(req, res, next) {
  try {
    const {category} = productInfo(req, res)
    const result = await getProductsByCategory(category)
    res.render('viewProducts', {product: result, category: category})
  } catch (err) {
    next(err)
  }
}

async function productDetails(req, res, next) {
  try {
    const {category, product} = productInfo(req, res)
    const result = await getProductDetails(category, product)
    res.render('productDescription', {product: result})
  } catch (err) {
    next(err)
  }
}

async function searchedProduct(req, res, next) {
  try {
    const {category, searchedProduct, sort} = productInfo(req, res)

    const products = await getSearchedProduct(searchedProduct, category)
        .sort(sort)
    sortResultsByPrice(sort, products)

    res.render('searchedProducts', {product: products, searchedProduct: searchedProduct})
  } catch (err) {
    next(err)
  }
}

module.exports = {fetchProduct, productDetails, searchedProduct}


