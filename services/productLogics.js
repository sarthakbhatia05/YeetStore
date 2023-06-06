const {sortBy} = require('../constant-strings')

function sortResultsByPrice(sort, products) {
  if (sort===sortBy.price) {
    products.reverse('price')
  }
}

module.exports = {sortResultsByPrice}
