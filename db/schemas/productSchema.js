/* eslint-disable require-jsdoc */
function productInfo(req, res) {
  const productDB = {
    product: req.query.product,
    category: req.query.category || '',
    searchedProduct: req.body.findProduct,
    sort: req.body.sortOption || 'createdAt',
  }
  return productDB
}

module.exports = {productInfo}
