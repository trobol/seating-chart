const jwt = require('jsonwebtoken');
const config = require('../../config.js');
module.exports = (req, res) => {
	//database check
	let user = {};
	//if valid login
	if (user) {
		var token = jwt.sign(user, 'shhhhh');
		res.cookie('token', token, { httpOnly: true });
	}


}