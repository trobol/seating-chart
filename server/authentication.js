const config = require('../config.js');
module.exports = (req, res, next) => {
	req.loggedIn = false;
	if (!req.cookies.token) next();

	jwt.verify(token, 'wrong-secret', function (err, decoded) {
		if (err) {
			next();
		} else {
			req.loggedIn = true;
			req.user = decoded;
		}
	});

	next();
}