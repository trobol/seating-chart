const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
module.exports = model('TimeLog',
	new Schema({
		userId: {
			type: ObjectId,
			ref: 'User'
		},
		login: Date,
		logout: Date
	})
);

