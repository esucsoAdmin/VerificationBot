const nodemailer = require('../misc/mailer');

module.exports = {
	name: 'verify', //verify-member //verify-friend //verify
	description: 'Verify command',
	async execute(client, message, args, Discord) {
		//Only unferified role can use this command, add command timeout (after 3 tries??) to avoid email spam
		//cannot use command if in database awaiting verification
		if (message.channel.type === 'DM' && !message.author.bot) {
			console.log('Verify Command - DM Recived');

			console.log(args);

			//get User input
			var email = args.shift();
			var name = args.toString().replace(',', ' ');

			console.log('Email: ' + email + ' Name: ' + name);

			let regexEmail = /^([aA-zZ]+[0-9]*)(\@live.esu.edu)$/; //https://regex101.com/r/DeO5gF/1
			let regexname =
				/^([A-Z][a-z]+)\s?(([A-Z]|([A-Z][a-z]+))\s)?([A-Z]|([A-Z][a-z]+))?$/; //https://regex101.com/r/GIctIr/1
			var validemail = regexEmail.test(email);
			var validname = regexname.test(name);

			console.log(validemail + ' ' + validname);

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
					.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
					.then((collected) => {
						const reaction = collected.first();

						if (reaction.emoji.name === '✅') {
							var code = Math.floor(100000 + Math.random() * 900000);
							//confirm email was actually sent through mailer
							var mailer = new nodemailer(email);
							var sent = mailer.send(
								'Hello ' + name + ', your verification code is: ' + code
							);
							console.log(sent);
							///set Nickname
							//store in DB (user.id, code, and date (Could be done in DB))
							embed.delete();
							message.reply(
								'Verification Email Sent! Please check your inbox.'
							);
						} else {
							embed.delete();
							message.reply('Use the !verify command again.');
							//this.execute(client, message, args, Discord);
						}
					})
					.catch((collected) => {
						embed.delete();
						message.reply('Message expired.');
					});
			} else if (!validemail) {
				message.reply('Invalid email. Please try the !verify command again.');
			} else if (!validname) {
				message.reply(
					'Invalid name format. Please try the !verify command again.'
				);
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
 * also check if their already in DB, so they cannot use cammand again send msg("Verification code alredy sent")
 * if join date is > message's date (delete member from DB(done automatically in DB))
 *|| member does not exist in DB (b/c auto deleted), must !verify again
 * else if code sent == code in DB && join date < message's date
 * member.role == verified
 *
 * AFTER VERIFITION COMPLETED:
 *
 * Are you a comp sci major? verfity-student => must have valid esu email		|=> could be alias
 * Are you and alumni? verify-alumni => must have valid esu email 				|=> could be alias
 * Do you go to ESU? verify-peer => must have valid esu email					|=> could be alias
 *
 * Are you a freind? verify-freind => must tag freind (check if in server) => send dm to friend, must accept => (board member approval???)
 *
 *
 * Move prefix in .env
 **/
