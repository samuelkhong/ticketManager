const express = require('express')
const upload = require('../middleware/multer');

const router = express.Router()
const testController = require('../controllers/test')
router.get('/', testController.getForm);
router.post('/', upload.single("image"),  testController.formUpload);

module.exports = router