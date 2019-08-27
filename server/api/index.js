const express = require('express'),
	router = express.Router();

router.use('/login', require('./login.js'));	

module.exports = router;