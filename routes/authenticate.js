// routes/authenticate.js
const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");



// router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignup)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
// router.post('/login', (req, res) => {
//     console.log(req.body.email)
//     console.log(req.body.password)
// })




router.get('/register', authController.getSignup)
router.post('/register', authController.postSignup)
router.get('/logout', authController.logout)





module.exports = router