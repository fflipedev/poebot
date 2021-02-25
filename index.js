const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const axios = require('axios');

const prefixo = '!';

client.on('ready', function ( ) {
    // client.channels.cache.get('795676425852026900').send('eae');

});

client.on("message", function (message) {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefixo)) return;

    const commandBody = message.content.slice(prefixo.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase()

    if(command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! Latencia de ${timeTaken}ms`)
    }

    if(command === "search")  {
       
      
    }

    if(command === 'outrocomando') {

    }
});

client.login(config.BOT_TOKEN);