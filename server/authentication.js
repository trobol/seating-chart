const	config = require('../config.js'),
		jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
	req.loggedIn = false;
	if (!req.cookies.token) next();

	jwt.verify(req.cookies.token, 'wrong-secret', function (err, decoded) {
		if (err) {
			next();
		} else {
			req.loggedIn = true;
			req.user = decoded;
		}
	});

	next();
}