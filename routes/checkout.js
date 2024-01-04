// routes/checkout.js
const express = require('express');
const path = require('path');  // Import the 'path' module
const router = express.Router();

router.get('/', (req, res) => {
    console.log('__dirname:', __dirname);
    
    // Log a message when a GET request is made to /checkout
    console.log('GET request to /checkout received');

    // Send an HTML file as a response
    const filePath = path.join(__dirname, '../public/checkout.html');
    console.log('Resolved filePath:', filePath);
    res.sendFile(filePath);
});


//router.post('/checkout', checkoutController.createTicket)



module.exports = router