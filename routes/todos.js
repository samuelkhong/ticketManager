const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");




// if not signed in, route to the login page
router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', ensureAuth, todosController.createTodo)

router.put('/markComplete', ensureAuth, todosController.markComplete)

router.put('/markIncomplete', ensureAuth, todosController.markIncomplete)

router.delete('/deleteTodo', ensureAuth, todosController.deleteTodo)

module.exports = router