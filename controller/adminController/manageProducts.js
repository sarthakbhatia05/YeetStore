/* eslint-disable require-jsdoc */
const {getAllCategories, getProductsByCategory,
  deleteProductFromModel, getProductsById,
updateProductDetails} = require('../../db/queries/productQueries')
const productModel = require('../../model/productModel')


async function fetchCategories(req, res, next) {
  try {
    const products = await getAllCategories()
    await getAllCategories()
    res.render('admin/allcategories', {products: products})
  } catch (err) {
    next(err)
  }
}

async function fetchProduct(req, res, next) {
  try {
    const category = req.query.category
    const result = await getProductsByCategory(category)
    res.render('admin/categoryproducts', {product: result, category: category})
  } catch (err) {
    next(err)
  }
}

async function deleteProduct(req, res, next) {
  try {
    const productToRemove = req.body.id
    await deleteProductFromModel(productToRemove)
    res.redirect('back')
  } catch (err) {
    next(err)
  }
}

async function editProductPage(req, res, next) {
  try {
    const id = req.query.id
    const product = await getProductsById(id)
    res.render('admin/editProduct', {product: product})
  } catch (err) {
    next(err)
  }
}

async function editProduct(req, res, next) {
  try {
    const id = req.query.id
    const updates = req.body
    await updateProductDetails(id, updates)
    res.redirect('back')
  } catch (err) {
    next(err)
  }
}

async function addNewProduct(req, res, next) {
  try {
    const productDetails = req.body
    const product = new productModel(productDetails)
    await product.save()
    res.redirect('back')
  } catch (err) {

  }
}


module.exports = {
  fetchCategories, fetchProduct, deleteProduct,
  editProductPage, editProduct, addNewProduct}
