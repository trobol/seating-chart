const express = require('express'),
	router = express.Router();

router.use('/login', require('./login.js'));
router.use('/user', require('./user'));
router.use('/seat', require('./seat'));
module.exports = router;