/* eslint-disable require-jsdoc */
const fs = require('fs')
const path = require('path')

const userInformation = require('../db/schemas/UserInfoSchema')

const {updateUserInfo, getUser} = require('../db/queries/userQueries')
const {getCartProducts, emptyCartAfterOrder} = require('../db/queries/cartQueries')
const {createNewOrder, findOrder, findOrderById} = require('../db/queries/orderQueries')
const {saveNewModel} = require('../db/queries/saveNewModelQuery')

const {orderStatus} = require('../constant-strings')

const {getCartProductDetails} = require('../services/cartLogics')
const {validatePhoneNumber, insertProductsInOrderArray,
  createPDFAndSave,
  insertProductAndQtyInArray} = require('../services/orderLogics')

async function userInfo(req, res, next) {
  try {
    const information = userInformation(req, res)
    validatePhoneNumber(information)
    const userCart= await getCartProducts(information.user)
    const items = insertProductAndQtyInArray(userCart)
    const newOrder = createNewOrder(information.user, items,
        information.address, information.phone)

    saveNewModel(newOrder)
    await updateUserInfo(information.user, information)
    res.redirect('/order/payments')
  } catch (err) {
    next(err)
  }
}

async function orderPlaced(req, res, next) {
  try {
    const {user} = userInformation(req, res)
    const orders = await findOrder(user, orderStatus.orderPending)
    const items = await getCartProductDetails(orders)
    orders.paymentMethod = req.body.payment
    orders.status = orderStatus.orderPlaced
    await emptyCartAfterOrder(user)
    saveNewModel(orders)
    res.render('orderPlaced', {product: items, order: orders})
  } catch (err) {
    next(err)
  }
}

async function generatePDF(req, res, next) {
  try {
    const id = req.query.id
    const orders = await findOrderById(id)
    const userData = await getUser(orders.user)
    const items = await insertProductsInOrderArray(orders.items)
    const data ={
      order: orders,
      users: userData,
      items: items,
    }

    const filePathName = path.resolve(__dirname, '../views/invoice.ejs')
    const htmlString = fs.readFileSync(filePathName).toString()
    createPDFAndSave(orders, htmlString, data, res)
  } catch (err) {
    next(err)
  }
}


module.exports = {userInfo, orderPlaced, generatePDF}
