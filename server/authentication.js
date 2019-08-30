const config = require('../config.js'),
	jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
	req.loggedIn = false;
	req.user = null;
	if (req.cookies.token) {

		jwt.verify(req.cookies.token, config.secret, function (err, decoded) {
			if (!err) {
				req.loggedIn = true;
				req.user = decoded;
			}
			next();
		});

	} else {
		next();
	}
}