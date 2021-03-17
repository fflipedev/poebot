const { Client, MessageEmbed, WebhookClient } = require('discord.js');
const config = require('./config.json');
const client = new Client();

const prefixo = '!';
const items = require('./items.js');

client.on('ready', function ( ) {
    // client.channels.cache.get('795676425852026900').send('eae');
});

client.on('messageReactionAdd', async (reaction, user) => {

    
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

    if(command === "trade")  {

        const consulta = args.join(' ');
        const result = items.getHashs(consulta, data => {
                const embed = new MessageEmbed()
                    .setTitle(`Resultado da Pesquisa - ${consulta}`)
                    .setColor(0xfcba03)
                    .setDescription(`Foram encontradas ${data.length} trocas em aberto`);
                for (item of data) {
                    embed.addField(item.nome, item.price);
                }
                message.reply(embed);
        });

    }
});

client.login(config.BOT_TOKEN);