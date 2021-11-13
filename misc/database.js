const verifyModel = require('../models/verifySchema');

/****Create member in Database****/
module.exports.createEntry = async (member) => {
	try {
		let profile = await verifyModel.create({
			serverID: member.guild.id,
			userID: member.id,
		});
		profile.save();
		console.log(`${member} added to database...`);
	} catch (error) {
		console.log(error);
	}
};

/****Delete member in Database****/
module.exports.deleteEntry = async (member) => {
	try {
		await verifyModel.deleteOne({
			serverID: member.guild.id,
			meberID: member.id,
		});
	} catch (error) {
		console.log(error);
	}
};

/****Returns true if the user has already generated a code else returns false****/
module.exports.checkEntry = async (member) => {
	try {
		profileData = await verifyModel.findOne({
			userID: member.id,
			//verifyCode: -1,
		});
		if (!profileData) {
			//Create user in database if not already created (fallback function)
			this.createEntry(member);
			return false;
		}
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
module.exports.updateEntry = async (member, code) => {};

/****Returns true if user enterned code matches database entry****/
module.exports.matchEntry = async (member, code) => {};
