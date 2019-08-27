const jwt = require('jsonwebtoken'),
	express = require('express'),
	router = express.Router(),
	config = require('../../config.js'),
	UserModel = require('../../models/user.js');

router.post('/', (req, res) => {

	let username = req.body.username,
		password = req.body.password;

	bcrypt.hash(password, Number(config.saltrounds))

	.then((hash) => {
		//database check
		UserModel.find({ username, hash }, (err, user) => {
			if (err) {
				console.log('Login Database Error:', err)
			}
			//if valid login
			if (user) {
				var token = jwt.sign(user, config.secret);
				res.cookie('token', token, { httpOnly: true });
			} 
		});
		
	}).catch((err) => {
		console.log('Login Hash Error: ', err);
	});
});



module.exports = router;	