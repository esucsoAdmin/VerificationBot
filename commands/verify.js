module.exports = {
	name: 'verify',
	description: 'Verify command',
	execute(client, message, args, Discord) {
		if (message.channel.type === 'DM' && !message.author.bot) {
			console.log('Verify - DM Recived');

			//Create and send embed

			console.log(args);
			//Regex and verify valid  args
			const email = args.shift();
			var name = '';
			args.forEach((word) => {
				name += word + ' ';
			});
			var proceed = false;

			if (!proceed) {
				message.author.send(
					'No Arguments provided. Please try the !verify command again followed by your name and email.'
				);
			} else {
				message.author.send('Arguments provided.');

				message.author.send('Name: ' + name);
				message.author.send('Email: ' + email);
				message.author
					.send(
						'Please confirm that the information you entered is correct by reacting to this message.'
					)
					.then((m) => {
						m.react('✅');
						m.react('❌');
					});
				/**
				 * Wait 30 seconds till react, else timeout if time exceeded
				 * else if reponded to react, generate 6-digit code and set server nickname to name
				 * call email_verification
				 *
				 * function email_verification(name, email, memberid, joindate, code)
				 * Store code, member id, member join date in Database
				 * Match responded code (must reply with 24 hours of code being sent (use member join date))
				 * with code in database using message.member.id and memberID in DB
				 * compare join date with message's date
				 * if join date is > message's date (delete member from DB(done automatically in DB))
				 *|| member does not exist in DB (b/c auto deleted), must !verify again
				 * else if code sent == code in DB && join date < message's date
				 * member.role == verified
				 **/
			}
		}
	},
};
