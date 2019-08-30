
const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
	name: String,
	pronoun: String,
	email: String,
	username: String,
	image: String,
	wiwId: Number,
	primaryPhone: String,
	slackId: String,
	created: { type: Date, default: Date.now },
	hash: String,
	//TODO switch to map
	type: String,
	updated: { type: Date, default: Date.now }
});

UserSchema.pre('save', next => {
	this.updated = Date.now();
	next();
});
module.exports = model('User', UserSchema);