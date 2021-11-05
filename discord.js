const Discord = require('discord.js');

require('dotenv').config();
const token = `${process.env.API_TOKEN}`;

const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const prefix = '!';

bot.once('ready', () => {
	console.log('Verification Bot is online!');
});

bot.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	switch (command) {
		case 'hi':
			message.channel.send('Hello');
			break;
	}
});

bot.login(token);
