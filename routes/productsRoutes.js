const express = require('express')
const router = express.Router()
const {fetchProduct,productDetails, searchedProduct} = require('../controller/productController')
const jwtAuth = require('../middlewares/verifyJWT')

router.get('/category', fetchProduct)


router.get('/products', productDetails)

router.post('/searchproducts', jwtAuth.checkUser, searchedProduct)
module.exports = router
