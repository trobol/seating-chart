const jwt = require('jsonwebtoken'),
	express = require('express'),
	router = express.Router(),
	config = require('../../config.js'),
	bcrypt = require('bcrypt'),
	UserModel = require('../../models/user.js');

router.post('/', async (req, res) => {
	console.log(req.body);
	let username = req.body.username,
		password = req.body.password;

	try {
		//database check
		const user = await UserModel.findOne({ username }).lean();

		if (user) {
			const matchPW = await bcrypt.compare(password, user.hash);
			if (matchPW) {
				console.log(user);
				var token = jwt.sign(user, config.secret);
				res.cookie('token', token, { httpOnly: true });
				res.status(200).send();
			} else {
				console.log("Incorrect password");
				res.status(403).send("Incorrect password");
			}
		} else {
			res.status(403).send("Incorrect Password");
		}

	} catch (e) {
		console.log(e);
		res.status(500).send(JSON.stringify(e));
	}
});



module.exports = router;	