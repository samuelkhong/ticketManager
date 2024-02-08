// routes/checkout.js
const express = require('express');
const path = require('path');  // Import the 'path' module
const router = express.Router();
const checkoutController = require('../controllers/checkout')


router.get('/', checkoutController.getTicket)
router.post('/', checkoutController.createTicket)



module.exports = router