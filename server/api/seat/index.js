const express = require('express'),
	Seat = require('../../../models/seat.js'),
	router = express.Router();

router.use('/reservations', require('./reservations.js'));



router.get('/', (req, res) => {
	Seat.find({}, (err, results) => {
		if (err) res.status(500).send(err);
		else if (results) {
			const seats = results.map(e => ({ sid: e.id, uid: e.userId, computerName: e.computerName }));
			res.send({ seats });
		} else {

		}
	});
});


module.exports = router;

