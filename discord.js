//https://discord.com/oauth2/authorize?client_id=906043468290338836&scope=bot&permissions=8589934591
//const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');

require('dotenv').config();
const token = `${process.env.API_TOKEN}`;

const intents = [
	'GUILDS',
	'GUILD_MEMBERS',
	'GUILD_MESSAGES',
	'DIRECT_MESSAGES',
];
const client = new Discord.Client({
	intents: intents,
	ws: { intents: intents },
	partials: ['CHANNEL'],
});

//Require Handlers
client.events = new Discord.Collection();
client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

client.login(token);
