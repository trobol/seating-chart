const express = require('express'),
	Seat = require('../../../models/seat.js'),
	User = require('../../../models/user.js'),
	router = express.Router();

router.use('/reservations', require('./reservations.js'));



router.get('/', (req, res) => {
	Seat.find({userId:{$ne:null}}, (err, results) => {
		if (err) res.status(500).send(err);
		else if (results) {
			let userCallbacks = [];
			for(let i in results) {
				if(results[i]) {
					userCallbacks[results[i].id] = User.findById(results[i].userId, 'name image').lean().exec();
				}
			}
			Promise.all(userCallbacks).then((users) => {
				//transform array to object to maintain 
				res.send({ users:Object.assign({}, users) });
			});
			
		} else {

		}
	});
});


router.post('/take', (req, res) => {
	Seat.findOne({id:req.body.id+1})
	.then((seat) => {
		//TODO: Check reservationss
		if(!seat)
			throw new Error('seat not found');
		//seat empty
		if(seat.userId === null) {
			Seat.findOne({userId:req.user._id})
			.then((oldSeat) => {
				if(oldSeat) {
					oldSeat.userId = null;
					oldSeat.save();
				} 
				
				seat.userId = req.user._id;
				seat.save();
				res.send();
			});
				
		} else {
			res.status(400);
		}	
	});
});

module.exports = router;

