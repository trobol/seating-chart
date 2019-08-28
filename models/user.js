
const { Schema, model } = require('mongoose');

module.exports = model('User',
	new Schema({
		name: String,
		pronoun: String,
		email: String,
		username: String,
		image: String,
		wiwId: Number,
		primaryPhone: String,
		slackId: String,
		accountCreated: { type: Date, default: Date.now },
		hash: String,
		//TODO switch to map
		type: String
	})
);