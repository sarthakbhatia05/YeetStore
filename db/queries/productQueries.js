const productModel = require('../../model/productModel')

function getProductsByCategory(category) {
  const result = productModel.find({category: category})
  return result
}

function getProductsById(id) {
  const result = productModel.findOne({_id: id})
  return result
}
async function getAllCategories() {
  return await productModel.distinct('category')
}

function getProductDetails(category, product) {
  const result = productModel.findOne({$and: [{category: category}, {name: product}]})
  return result
}

function getSearchedProduct(searchedProduct, category) {
  const result = productModel.find({
    $or: [
      {name: {$regex: searchedProduct, $options: 'i'}},
      {category: {$regex: searchedProduct, $options: 'i'}},
    ],
    category: {$regex: category, $options: 'i'},
  })
  return result
}

async function deleteProductFromModel(productToRemove) {
  await productModel.deleteOne({_id: productToRemove})
}

async function updateProductDetails(id, updates) {
  await productModel.updateOne({_id: id}, {$set: updates})
}

module.exports = {getProductsByCategory, getAllCategories, getProductsById,
  getProductDetails, getSearchedProduct,
  getAllCategories, deleteProductFromModel,
  updateProductDetails}

