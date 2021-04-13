const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceControllers = require('../controllers/sauce');

router.post('/', auth, sauceControllers.createSauce);

module.exports = router;