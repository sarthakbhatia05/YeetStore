/* eslint-disable require-jsdoc */
const {findAllOrders, updateOrderStatus} = require('../../db/queries/orderQueries')
const {orderStatus}= require('../../constant-strings')

async function getAllOrders(req, res, next) {
  try {
    const orders = await findAllOrders()
    orders.reverse('createdAt')
    res.render('admin/allorders', {order: orders})
  } catch (err) {
    next(err)
  }
}

async function completeOrder(req, res, next) {
  try {
    const id = req.query.id
    await updateOrderStatus(id, orderStatus.orderCompleted)

    res.redirect('back')
  } catch (err) {
    next(err)
  }
}
module.exports = {getAllOrders, completeOrder}
