const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
	serverID: { type: String, required: true },
	userID: { type: String, require: true, unique: true },
	verifyCode: { type: Number, require: true, default: -1 },
});

const model = mongoose.model('VerifyModels', verifySchema);

module.exports = model;
