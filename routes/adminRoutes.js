const express = require('express')
const router = express.Router()
const UserSchema = require('../model/userModel')
const {showUsers, deleteUser} = require('../controller/adminController/manageUsers')
const {fetchCategories, fetchProduct, deleteProduct, editProductPage, editProduct, addNewProduct} = require('../controller/adminController/manageProducts')
const {getAllOrders, completeOrder} = require('../controller/adminController/manageOrders')
const jwtAuth = require('../middlewares/verifyJWT')


router.get('/home', async (req, res)=>{
  if (res.locals.user) {
    const username = await UserSchema.findOne({email: res.locals.user})
    res.render('admin/admin-home', {username: username.fullname})
  } else {
    res.render('admin/admin-home')
  }
})

router.get('/users', showUsers)
router.get('/productcategories', jwtAuth.checkUser, fetchCategories)
router.get('/category', fetchProduct)
router.get('/editproductpage', editProductPage )
router.post('/deleteproduct', deleteProduct)
router.post('/editproduct', editProduct)
router.get('/deleteuser', deleteUser)
router.get('/addproductpage', (req, res)=>{
  res.render('admin/addproduct')
})
router.post('/addnewproduct', addNewProduct)
router.get('/allorders', getAllOrders)
router.get('/completeorder', completeOrder)

module.exports = router
