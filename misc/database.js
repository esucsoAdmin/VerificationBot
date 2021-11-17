const verifyModel = require('../models/verifySchema');

/****Create member in Database****/
module.exports.createEntry = async (memberID, guildID) => {
	try {
		profileData = await verifyModel.create({
			serverID: guildID,
			userID: memberID,
		});
		profileData.save();
		console.log('User added to database...');
	} catch (error) {
		console.log(error);
	}
};

/****Delete member in Database****/
module.exports.deleteEntry = async (memberid, guildID) => {
	try {
		await verifyModel.deleteOne({
			serverID: guildID,
			userID: memberid,
		});
		console.log('User removed from database...');
	} catch (error) {
		console.log(error);
	}
};

/****Returns true if the user has already generated a code else returns false****/
module.exports.hasVerifyCode = async (guildID, memberID) => {
	try {
		profileData = await verifyModel.findOne({
			serverID: guildID,
			userID: memberID,
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
module.exports.addVerifyCode = async (guildID, memberID, code) => {
	try {
		profileData = await verifyModel.findOneAndUpdate(
			{
				serverID: guildID,
				userID: memberID,
			},
			{
				verifyCode: code,
			}
		);
	} catch (error) {
		console.log(error);
	}
};

/****Returns true if user enterned that matches database entry****/
module.exports.matchCode = async (guildID, memberID, code) => {
	try {
		profileData = await verifyModel.findOne({
			serverID: guildID,
			userID: memberID,
		});
		if (profileData.verifyCode == code) {
			//User enters matching code.
			return true;
		} else {
			//User did not enter matching code.
			return false;
		}
	} catch (error) {
		console.log(error);
	}
};

/****Returns profileData for user matching given id in database****/
module.exports.getProfileData = async (memberID) => {
	try {
		profileData = await verifyModel.findOne({
			userID: memberID,
		});
		if (profileData) {
			return profileData;
		}
	} catch (error) {
		console.log(error);
	}
};
