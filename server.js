const express = require('express')
const app = express()
const path = require('path'); // Add this line to import the 'path' module

const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')
const checkoutRoutes = require('./routes/checkout');
const testRoutes = require ('./routes/test')



require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//app.use('/', homeRoutes)
// app.use('/todos', todoRoutes)
app.use('/', checkoutRoutes);
// app.use('/test', testRoutes)


 
app.listen(process.env.PORT, ()=>{
    console.log('Server yo!')
})    