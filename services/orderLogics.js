const {getProductsById} = require('../db/queries/productQueries')
const {pdfFormat} = require('../constant-strings')
const fs = require('fs')
const ejs =require('ejs')
const pdf = require('html-pdf')
const path = require('path')
const {errors} = require('../constant-strings')


async function insertProductsInOrderArray(itemsOfOrders) {
  const items = []
  for (const item of itemsOfOrders) {
    const products = await getProductsById(item.product)
    items.push(products)
  }
  return items
}
function insertProductAndQtyInArray(userCart) {
  const items = []
  for (const item of userCart.items) {
    items.push({product: item.product,
      quantity: item.quantity})
  }
  return items
}

function readInvoiceAndSendToUser(res, filePath, orders) {
  fs.readFile(filePath, (err, file)=>{
    if (err) {
      return res.status(500).send(errors.couldNotDownload)
    }

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment;filename="${orders._id}.pdf"`)

    res.send(file)
  })
}

function createPDFAndSave(orders, htmlString, data, res) {
  const options = {
    format: pdfFormat,
  }
  const ejsData = ejs.render(htmlString, data)
  pdf.create(ejsData, options)
      .toFile(`invoices/${orders._id}.pdf`, (err, response)=>{
        if (err) throw new Error(err)
        const filePath = path.resolve(__dirname, `../invoices/${orders._id}.pdf`)
        readInvoiceAndSendToUser(res, filePath, orders)
      })
}

function validatePhoneNumber(information) {
  const re = /^\d{10}$/
  if (re.test(information.phone)==false) {
    throw new Error(errors.wrongPhoneNumError)
  }
}
module.exports = {insertProductsInOrderArray,
  readInvoiceAndSendToUser, createPDFAndSave, validatePhoneNumber, 
  insertProductAndQtyInArray}
