module.exports = {
	name: 'verify',
	description: 'Verify command',
	execute(client, message, args, Discord) {
		if (message.channel.type === 'DM' && !message.author.bot) {
			console.log('Verify - DM Recived');

			//Create and send embed

			const email = args.shift();
			var name = '';
			args.forEach((word) => {
				name += word + ' ';
			});

			console.log(email + ' ' + name);

			let regexEmail = /^([aA-zZ]+[0-9]*)(\@live.esu.edu)$/;
			let regexname = /^([A-Z][a-z]+)\s([A-Z]\s)?([A-Z])([a-z]+)?\s$/;
			var validemail = regexEmail.test(email);
			var validname = regexname.test(name);

			console.log(validemail + '' + validname);

			if (validemail && validname) {
				const confirmEmbed = new Discord.MessageEmbed()
					.setColor('#304281')
					.setTitle('Confirmation')
					.setDescription(
						'Please confirm if the information enterned is correct.'
					)
					.addFields(
						{ name: 'Name:', value: '' + name },
						{ name: 'Email:', value: '' + email }
					)
					.setFooter('Message will expire after 45 seconds.');

				message.author.send({ embeds: [confirmEmbed] }).then((embedMessage) => {
					embedMessage.react('✅').then(() => embedMessage.react('❌'));
				});

			} else {
				message.author.send('Please try the !verify command again.');
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
