const orderModel = require('../../model/orderModel')


function findAllOrders() {
  const orders = orderModel.find()
  return orders
}


function createNewOrder(user, items, address, phone) {
  const result = new orderModel({user: user,
    items: items, shippingAdress:
        address, phone: phone})
  return result
}

function findOrder(user, orderStatus) {
  const result = orderModel.findOne({user: user, status: orderStatus})
  return result
}

function findOrderById(id) {
  const result = orderModel.findOne({_id: id})
  return result
}

async function updateOrderStatus(id, status) {
  await orderModel.updateOne({_id: id}, {$set: {status: status}})
}


module.exports = {createNewOrder, findOrder, findOrderById,
  findAllOrders, updateOrderStatus}
