
const { Schema, model } = require('mongoose');

UserSchema = new Schema({
	userId: Number,
	name: String,
	pronoun: String,
	email: String,
	username: String,
	image: String,
	wiwId: Number,
	primaryPhone: String,
	slackId: String,
	accountCreated: Date,
	hash: String
});

module.exports = model('User', UserSchema);