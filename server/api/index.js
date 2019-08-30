const express = require('express'),
	router = express.Router();


router.get('/logout', (req, res) => {
	res.clearCookie('token', { path: '/' });
	res.status(200).send("logged out");
});


router.use('/login', require('./login.js'));
router.use('/user', require('./user'));
router.use('/seat', require('./seat'));
module.exports = router;