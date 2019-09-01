const express = require('express'),
	router = express.Router(),
	Reservation = require('../../../models/reservation.js');



//Gets all reservation info
router.get('/', (req, res) => {

	Reservation.find({}, (err, seats) => {
		if (err)
			res.send({ response: err });
		else if(seats)
			res.status(200).send({ seats });
		else 
			res.send();
	});

});



module.exports = router;