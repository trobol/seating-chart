const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
module.exports = model('Reservation',
	new Schema({
		userId: {
			type: ObjectId,
			ref: 'User'
		},
		seatId: {
			type: ObjectId,
			ref: 'Seat'
		}
	})
);

