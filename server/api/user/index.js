const express = require('express'),
	router = express.Router(),
	User = require('../../../models/user.js'),
	TimeLog = require('../../../models/timelog.js'),
	Seat = require('../../../models/seat.js'),
	fs = require('fs'),
	path = require('path');

router.use('/', (req, res, next) => {
	if (req.loggedIn) {
		next();
	} else {
		res.send(({ authenticated: false }));
	}
});
router.use('/reservations', require('./reservations.js'));

router.get('/type', (req, res) => {

	User.findById(req.user._id, (err, type) => {
		res.send({ type });
	});

});


router.get('/clock', (req, res) => {

	TimeLog.findOne({ userId: req.user._id, logout: null }, (err, clock) => {
		res.send({ clock });
	});

});

router.post('/clock-in', async (req, res) => {

	try {
		// Check if user already clocked in
		const clockedIn = await TimeLog.exists({ userId: req.user._id, logout: null });

		// if not then clock user in
		if (!clockedIn) {

			let results = await TimeLog.create({ userId: req.user._id, login: Date.now(), logout: null });
			res.send({ results });

			// else tell the user that they are already clocked in
		} else {
			res.status(400).send({ response: 'failure' });
		}

	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
});

router.post('/clock-out', async (req, res) => {
	try {
		let results = await TimeLog.findOne({ userId: req.user._id, logout: null });
		if (results) {
			results.logout = Date.now();
			await results.save();
			res.send({ results });
		} else {
			res.status(400).send({ response: 'failure' });
		}

	} catch (err) {
		console.log(err);
		res.status(500).send();
	}

});

//TODO add log for other activites
router.get('/activity', (req, res) => {
	TimeLog
		.find({})
		.sort({ 'login': -1 })
		.limit(10)
		.lean()
		.exec(function (err, results) {
			if (err) res.send({ err });
			try {
				let logs = [];

				const promises = results.map(async (log) => {

					let user = await User.findById(log.userId);

					let image = `/static/users/${user.image}.jpg`;
					if (log.login) {
						logs.push({ log: `${user.name} clocked in`, date: log.login, image });
					}
					if (log.logout) {
						logs.push({ log: `${user.name} clocked out`, date: log.logout, image });
					}


				});

				Promise.all(promises).then((result) => {
					logs.sort((a, b) => {
						return b.date - a.date;
					});
					res.send({ result: logs });
				});
			} catch (err) {
				console.log(err);
			}
		});
});

router.get('/seat', (req, res) => {
	Seat.findOne({ userId: req.user._id }, (err, seat) => {
		if (err)
			res.status(500).send(err);
		else if (seat)
			res.send({ seat });
		else
			res.send();
	});
});

const base = path.resolve('.');
router.get('/', (req, res) => {



	fs.stat(`${base}/static/users/${req.user.image}.jpg`, err => {
		User.findById(req.user._id, '_id name pronoun major projects type').lean()
			.then(user => {
				user.path = `/static/users/${err ? 'guest' : req.user.image}.jpg`;
				console.log(user);
				res.send({ user, authenticated: true });

			}).catch(e => {
				console.log(e);
				res.status(500).send(JSON.stringify(e));
			});
	});

});




module.exports = router;