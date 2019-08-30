

const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
module.exports = model('Seat',
	new Schema({
		id: Number,
		userId: {
			type: ObjectId,
			ref: 'User',
			default:null
		},
		computerName: String

	})
);

