module.exports = (Discord, client, member) => {
	var channel = client.channels.cache.get('906056492766097421'); //Channel id for verification

	if (!channel) return;

	member.roles.add('906081086226972675'); //Role id for unverified

	channel.send('Welcome to our server <@' + member.user.id + '>!.');
	channel.send(
		'For access to server, please follow the instructions Dmd to you.'
	);
	channel.send(
		'If you have any questions, please use the !help command, or ask an Admin for help.'
	);

	member.send(
		'Begin the verification process with !verify command followed by your real first and last name, and email - all seperated by spaces.'
	);
	member.send('You will need a valid @esu.edu email to join the server.');

	//save when user was added member.joindate()
};
