const express = require('express')
const router = express.Router()

const {userInfo, orderPlaced, generatePDF} = require('../controller/orderController')
const jwtAuth = require('../middlewares/verifyJWT')

router.post('/userinfo', jwtAuth.checkUser, userInfo)
router.post('/orderplaced', jwtAuth.checkUser, orderPlaced)
router.get('/payments', (req, res)=>{
  res.render('payment')
})
router.get('/ordernow', (req, res)=>{
  res.render('order')
})
router.get('/generatepdf', jwtAuth.checkUser, generatePDF)


module.exports = router
