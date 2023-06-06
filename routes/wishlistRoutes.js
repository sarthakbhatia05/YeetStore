const express = require('express')
const router = express.Router()

const {addToWishlist, fetchWishlist, deleteItem} = require('../controller/wishlistController')
const jwtAuth = require('../middlewares/verifyJWT')

router.post('/addtowishlist', jwtAuth.checkUser, jwtAuth.verifyToken, addToWishlist)
router.post('/deletewishlist', jwtAuth.checkUser, deleteItem)
router.get('/wishlist', jwtAuth.checkUser, jwtAuth.verifyToken, fetchWishlist)

module.exports = router
