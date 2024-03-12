const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/events')

router.get('/', eventsController.getAll)
//router.get('/:id', eventsController.getEvent)
module.exports = router;
