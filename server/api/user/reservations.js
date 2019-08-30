const express = require('express'),
	router = express.Router(),
	Reservation = require('../../../models/reservation.js'),
	moment = require('moment');

router.get('/today', (req, res) => {
	if (req.loggedIn) {
		const { user } = req;
		const today = moment().startOf('day')

		Reservation.findOne({
			createdAt: {
				$gte: today.toDate(),
				$lte: moment(today).endOf('day').toDate()
			}
		}, (err, reservation) => {

			if (err) res.send({ err });
			else if (reservation) res.send({ reservation });
		});


	} else {
		res.send({ authenicated: false });
	}
});

module.exports = router;