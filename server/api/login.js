const jwt = require('jsonwebtoken'),
	express = require('express'),
	router = express.Router(),
	config = require('../../config.js'),
	bcrypt = require('bcrypt'),
	UserModel = require('../../models/user.js');

router.post('/', async (req, res) => {
	let username = req.body.username,
		password = req.body.password;

	try {
		//database check
		const user = await UserModel.findOne({ username }).lean();

		if (user) {
			const matchPW = await bcrypt.compare(password, user.hash);
			if (matchPW) {
				var token = jwt.sign(user, config.secret);

				const properties = { httpOnly: true };
				if (req.body.remember) {
					//time till cookie experation, in ms
					properties.maxAge = 10000000000000;
				}

				res.cookie('token', token, properties);
				res.status(200).send({ user });
			} else {
				res.status(401).send({ password: true });
			}
		} else {
			res.status(401).send({ username: true });
		}

	} catch (e) {
		console.log(e);
		res.status(500).send(JSON.stringify(e));
	}
});



module.exports = router;	