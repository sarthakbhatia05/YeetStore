const express = require('express')
const router = express.Router()
const jwtAuth = require('../middlewares/verifyJWT')
const UserSchema = require('../model/userModel') 
router.get('/', (req, res)=>{
  res.redirect('/home')
})

router.get('*', jwtAuth.checkUser)

router.get('/home', async (req, res)=>{
  if (res.locals.user) {
    console.log(res.locals.user)
    const username = await UserSchema.findOne({email: res.locals.user})
    res.render('home', {username: username.fullname})
  } else {
    res.render('home')
  }
})

router.get('/test', (req, res)=>{
  res.render('test')
})


router.get('/login', (req, res)=>{
  res.render('login')
})

router.get('/signup', (req, res)=>{
  res.render('signup')
})

module.exports = router
