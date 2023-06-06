const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const db = process.env.DATABASE_LOCAL

mongoose.set('strictQuery', true)

mongoose
    .connect(db)
    .then(() => {
      console.log('Connected to database')
    })
    .catch((err) => console.log(err.message))
