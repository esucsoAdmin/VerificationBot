const Discord = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose');

const intents = [
	'GUILDS',
	'GUILD_MEMBERS',
	'GUILD_MESSAGES',
	'GUILD_MESSAGE_REACTIONS',
	'DIRECT_MESSAGES',
	'DIRECT_MESSAGE_REACTIONS',
];
const client = new Discord.Client({
	intents: intents,
	ws: { intents: intents },
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

//Require Handlers
client.events = new Discord.Collection();
client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

mongoose
	.connect(process.env.MONGODB_SRV, {
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to database!');
	})
	.catch((error) => {
		console.log(error);
	});

client.login(process.env.API_TOKEN);
