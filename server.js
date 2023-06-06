const express = require('express')
const createError = require('http-errors')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
const errorHandeler = require('./middlewares/errorHandeler')
const jwtAuth = require('./middlewares/verifyJWT')

dotenv.config({path: './config.env'})

const app = express()
const PORT = process.env.PORT || 4200
const publicDirectory = path.join(__dirname, './public')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(express.static(publicDirectory))

dotenv.config({path: './config.env'})

const viewRoutes = require('./routes/viewRoutes')
const userAuthRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productsRoutes')
const addToCart = require('./routes/cartRoutes')
const wishlist = require('./routes/wishlistRoutes')
const order = require('./routes/orderRoute')
const admin = require('./routes/adminRoutes')
require('./helpers/initializeMonogdb')

app.use('/', viewRoutes)
app.use('/auth', userAuthRoutes)
app.use('/', productRoutes)
app.use('/', addToCart)
app.use('/', wishlist)
app.use('/order', order)
app.use('/admin', admin)
app.use('*', jwtAuth.checkUser)

app.use(async (req, res, next) => {
  next(createError.NotFound('Page do not found'))
})
app.use(errorHandeler)

app.listen(PORT, ()=>{
  console.log(`Server is running On PORT ${PORT}`)
})
