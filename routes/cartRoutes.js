const express = require('express')
const router = express.Router()
const controller = require('../controller/cartController')
const jwtAuth = require('../middlewares/verifyJWT')


router.get('/cart', jwtAuth.checkUser, jwtAuth.verifyToken, controller.showCart)

router.post('/addtocart',jwtAuth.checkUser, jwtAuth.verifyToken,controller.addToCart)
router.post('/deleteItem', jwtAuth.checkUser, controller.deleteItem)
router.post('/changeqty', jwtAuth.checkUser, controller.changeQty)


module.exports = router

