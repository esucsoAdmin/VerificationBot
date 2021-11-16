const nodemailer = require('../misc/mailer');
const database = require('../misc/database');

//functions to validate user input matching regex
const validemail = (str) => {
	let regex = /^([aA-zZ]+[0-9]*)(\@live.esu.edu)$/; //https://regex101.com/r/DeO5gF/1
	if (regex.test(str)) return true;
	else return false;
};

const validname = (str) => {
	let regex =
		/^([A-Z][a-z]+)\s?(([A-Z]|([A-Z][a-z]+))\s)?([A-Z]|([A-Z][a-z]+))?$/; //https://regex101.com/r/GIctIr/1
	if (regex.test(str)) return true;
	else return false;
};

module.exports = {
	name: 'verify',
	description: 'Verify command',
	async execute(client, message, args, Discord) {
		if (message.channel.type === 'DM' && !message.author.bot) {
			console.log('Verify Command - DM Recived');

			/****No arguments given.****/
			if (!args.length) {
				message.reply('No arguments given.');
				return;
			}

			/****User tries to verify again.****/
			if (await database.hasVerifyCode(message.author.id)) {
				message.reply(
					'A verification code has already been generated and sent to your email address.'
				);
				return;
			}

			/****Match User object with guildMember object using info in DB****/
			let profileData = await database.getProfileData(message.author.id);
			const guild = await client.guilds.cache.get(profileData.serverID);
			let member = await guild.members.fetch(profileData.userID);

			//get user input
			console.log(args);
			var email = args.shift();
			var name = args.toString().replace(',', ' ');
			console.log('Email: ' + email + ' Name: ' + name);

			console.log(
				'Valid email: ' + validemail(email) + ' Valid name:' + validname(name)
			);

			//validate user input
			switch (validemail(email) + ' ' + validname(name)) {
				case 'false false':
					message.reply(
						'Invalid email and name. Please try the !verify command again.'
					);
					return;
				case 'false true':
					message.reply('Invalid email. Please try the !verify command again.');
					return;

				case 'true false':
					message.reply(
						'Invalid name format. Please try the !verify command again.'
					);
					return;

				default:
					//Proceed if correct arguments are given
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
								var mailer = new nodemailer(email); //change mailer class
								mailer.send(
									'Hello ' + name + ', your verification code is: ' + code
								);
								//set Nickname
								//store in DB (code, email, date)
								database.addVerifyCode(member.user.id, code);
								message.reply(
									'Verification email sent! Please check your inbox.'
								);
							} else {
								message.reply('Use the !verify command again.');
							}
							embed.delete();
						})
						.catch((collected) => {
							message.reply(
								'Message expired. Please use the !verify command again.'
							);
							embed.delete();
						});
			}
		} else message.reply('For privacy, that command cannot be used here.');
	},
};
