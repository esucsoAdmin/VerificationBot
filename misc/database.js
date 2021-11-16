const verifyModel = require('../models/verifySchema');

/****Create member in Database****/
module.exports.createEntry = async (id, guildID) => {
	try {
		profileData = await verifyModel.create({
			serverID: guildID,
			userID: id,
		});
		profileData.save();
		console.log('User added to database...');
	} catch (error) {
		console.log(error);
	}
};

/****Delete member in Database****/
module.exports.deleteEntry = async (id, guildID) => {
	try {
		await verifyModel.deleteOne({
			serverID: guildID,
			meberID: id,
		});
		console.log('User removed from database...');
	} catch (error) {
		console.log(error);
	}
};

/****Returns true if the user has already generated a code else returns false****/
module.exports.hasVerifyCode = async (id) => {
	try {
		profileData = await verifyModel.findOne({
			userID: id,
		});
		if (profileData.verifyCode != -1) {
			//User has generated a code.
			return true;
		} else {
			//User has not generated a code.
			return false;
		}
	} catch (error) {
		console.log(error);
	}
};

/****Updates verification code in database****/
module.exports.addVerifyCode = async (id, code) => {
	try {
		profileData = await verifyModel.findOneAndUpdate(
			{
				userID: id,
			},
			{
				verifyCode: code,
			}
		);
	} catch (error) {
		console.log(error);
	}
};

/****Returns true if user enterned code matches database entry****/
module.exports.matchCode = async (id, code) => {};

/****Returns profileData for user matching given id in database****/
module.exports.getProfileData = async (id) => {
	try {
		profileData = await verifyModel.findOne({
			userID: id,
		});
		if (profileData) {
			return profileData;
		}
	} catch (error) {
		console.log(error);
	}
};
