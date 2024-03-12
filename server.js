const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const connectDB = require('./config/database');
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");

const homeRoutes = require('./routes/home');
const todoRoutes = require('./routes/todos');
const checkoutRoutes = require('./routes/checkout');
const authenticateRoutes = require('./routes/authenticate');
const testRoutes = require('./routes/test');
const eventsRoutes = require('./routes/events');

// used to access .env file
require('dotenv').config({path: './config/.env'});

// Passport config  
require("./config/passport")(passport);

// // Setup Sessions - stored in MongoDB
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_STRING, 
  mongooseConnection: mongoose.connection,
  collectionName: 'sessions', // Specify the collection name if needed
});

// connect to db
connectDB()

// //Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: 'swagbucks',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// use connect-flash middleware 
app.use(flash());


// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set viewing engine to ejs
app.set('view engine', 'ejs');

//static folder
app.use(express.static('public'));

//body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// setup routes server is listening to
app.use('/', homeRoutes);
app.use('/todos', todoRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/authenticate', authenticateRoutes);
app.use('/test', testRoutes);
app.use('/events', eventsRoutes);

//  check if connected to DB before starting our server
mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Yo Server is running on port ${process.env.PORT}`);
  });
});
