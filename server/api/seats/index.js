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


router.post('/take', (req, res) => {
	Seat.findOne({id:req.body.seat})
	.then((seat) => {
		//TODO: Check reservationss
		if(!seat)
			throw new Error('seat not found');
		if(seat.userId === null) {
			seat.userId = req.user._id;
			seat.save();
			res.send();
		} else {
			res.status(400);
		}	
	});
});

module.exports = router;

