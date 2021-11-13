const database = require('../../misc/database');

module.exports = async (Discord, client, member) => {
	database.deleteEntry(member);
};
