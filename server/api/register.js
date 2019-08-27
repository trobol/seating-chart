const jwt = require('jsonwebtoken'),
	express = require('express'),
	router = express.Router(),
	bcrypt = require('bcrypt'),
	config = require('../../config.js'),
	UserModel = require('../../models/user.js');

//register a new user
router.post('/', (req, res) => {
	console.log('got request');
	//if missing any fields thow error
	const md = (dataName) => {
		res.status(400).send('Missing: ' + dataName);
	}

	let {
		name = md('name'), pronoun = md('pronoun'), email = md('email'), username = md('username'), phone = md('phone'), password = md('password'), userType = md('userType'), projects= md('projects'), major = md('major'),
	} = req.body;

	
	//check for duplicate user
	UserModel.find({username})

	.then(results => {
		if(results) {
			throw { status: 400, log: false, message: `User ${username} already exists`}
		}
		return bcrypt.hash(password, Number(config.saltrounds));
		
	})

	.then(hash => {	
		let user = new UserModel({
			name, pronoun, email, username, phone, hash, userType, projects, major,
		});
		return user.save();
	})
	.then(user => {

		res.status(200).send('yay');
		
	})
	.catch( err => {
		let errString = 'User Register Hash Error:' + JSON.stringify(err);
		console.log(err);
		console.log(errString);
		res.status(500).send(errString);
	});
});

module.exports = router;