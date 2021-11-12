const message = require('./message');

module.exports = (Discord, client, member) => {
	var channel = client.channels.cache.get('907413136989114395'); //Channel id for verification

	if (!channel) return;

	var role = member.guild.roles.cache.find(
		(role) => role.name === 'Unverified'
	);
	member.roles.add(role);

	//Create and send embed
	const welcomeEmbed = new Discord.MessageEmbed()
		.setColor('#304281')
		.setTitle('Rules')
		//.setURL('www.csoesu.org')
		.setDescription('Please read the rules below for access to the server.')
		.addFields(
			{ name: 'Rule 1:', value: 'Must be an ESU student.' },
			{ name: 'Rule 2:', value: 'Must have valid @live.esu.edu email' },
			{
				name: 'Rule 3:',
				value: 'Must be verified (Check DM from Verification Bot)',
			}
		)
		.setFooter(
			'If you have any questions, please use the !help command, or ask an Admin for help.'
		);

	channel.send('Welcome to our server <@' + member.user.id + '>!.');
	channel.send({ embeds: [welcomeEmbed] });

	const verifyEmbed = new Discord.MessageEmbed()
		.setColor('#304281')
		.setTitle('Verification Process')
		.setDescription('Please follow the steps below for access to the server.')
		.addFields(
			{
				name: 'Step 1:',
				value:
					'Begin the verification process with !verify command followed by your email, and first and last name (feel free to include middle initial) - seperated by spaces.',
			},
			{
				name: 'Examples:',
				value:
					'!verify jsmith@live.esu.edu John Smith\n!verify jsmith@live.esu.edu John S\n!verify jsmith@live.esu.edu John A Smith',
			},
			{
				name: 'Step 2:',
				value:
					'You will be asked to confirm if the information entered is correct. You must react within 45 seconds or you must start the verification process again.',
			},
			{
				name: 'Step 3:',
				value:
					'After confirmation, you will be sent a verification code to the provided email.',
			},
			{
				name: 'Step 3:',
				value: 'Reply to the bot, with the code, within 24 hours.',
			}
		)
		.setFooter(
			'If you have any questions, please use the !help command, or ask an Admin for help.'
		);

	member.send({ embeds: [verifyEmbed] });

	//save when user was added member.joindate()
};
