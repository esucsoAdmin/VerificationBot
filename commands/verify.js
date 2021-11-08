const messageReactionAdd = require('../events/client/messageReactionAdd');

module.exports = {
	name: 'verify',
	description: 'Verify command',
	async execute(client, message, args, Discord) {
		if (message.channel.type === 'DM' && !message.author.bot) {
			console.log('Verify - DM Recived');

			//get User input
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
					.setFooter('Message will expire after 30 seconds.');

				let embed = await message.reply({ embeds: [confirmEmbed] });

				await embed.react('✅');
				await embed.react('❌');

				const filter = (reaction, user) => {
					return ['✅', '❌'].includes(reaction.emoji.name) && !user.bot;
				};

				embed
					.awaitReactions({ filter, max: 1, time: 10000, errors: ['time'] })
					.then((collected) => {
						const reaction = collected.first();

						if (reaction.emoji.name === '✅') {
							embed.delete();
							message.reply('Information confirmed!');
						} else {
							embed.delete();
							message.reply('Use the !verify command again.');
						}
					})
					.catch((collected) => {
						embed.delete();
						message.reply('Message expired.');
					});
			} else if (!validemail) {
				message.reply('Invalid email. Please try the !verify command again.');
			} else if (!validname) {
				message.reply('Invalid email. Please try the !verify command again.');
			}
		} else message.reply('That command cannot be used here.');
	},
};

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
