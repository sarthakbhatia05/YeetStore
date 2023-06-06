/* eslint-disable require-jsdoc */

function cartSchema(req, res) {
  const schema = {
    user: res.locals.user,
    item: {
      product: req.body.id,
      quantity: parseInt(req.body.orderQuantity),
    }}
  return schema
}

module.exports = cartSchema
