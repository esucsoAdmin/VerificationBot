//https://discord.com/oauth2/authorize?client_id=906043468290338836&scope=bot&permissions=8589934591
//const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');

require('dotenv').config();
const token = `${process.env.API_TOKEN}`;

const intents = ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'];
const client = new Discord.Client({
	intents: intents,
	ws: { intents: intents },
});

client.once('ready', () => {
	console.log('Verification Bot is online!');
});

client.on('guildMemberAdd', (member) => {
	var channel = client.channels.cache.get('906056492766097421'); //Channel id for verification

	if (!channel) return;

	member.roles.add('906081086226972675'); //Role id for unverified

	channel.send(
		'Welcome to our server <@' + member.user.id + '>, please verify your email.'
	);
	channel.send('Begin the verification process with !verify command.');

	//save when user was added member.joindate()
});

const prefix = '!';

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	switch (command) {
		case 'hi':
			message.channel.send('Hello');
			break;
	}
});

client.login(token);
