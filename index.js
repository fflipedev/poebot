const { Client, MessageEmbed } = require('discord.js');
const config = require('./config.json');
const client = new Client();
const json = require('./colecao.js');
const request = require('./request.js');
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

    if(command === "trade")  {
        const item = args.join(' ');
        const pesquisa = json.search(item);
        
        let url = 'https://www.pathofexile.com/api/trade/search/Hardcore%20Ritual';
        let body = {
            "query": {
                "status": {
                    "option": "online"
                },
                "name": pesquisa.id,
                "type": pesquisa.tipo,
                "stats": [{
                    "type": "and",
                    "filters": []
                }]
            },
            "sort": {
                "price": "asc"
            }
        };

        const limit = 5; //limite de registros por pagina

        const data = request.search(url, body, 'post')
            .then(response => {
                let count = 0;
                console.log(response);
                const embed = new MessageEmbed()
                    .setTitle(`Resultado da Pesquisa - ${item}`)
                    .setColor(0xfcba03)
                    .setDescription(`Foram encontradas ${response.result.length} trocas em aberto`);
                
                response.result.forEach(hash => { 
                    if(count >= limit) return;
                    
                    embed.addField(hash)
                    count++;
                });
                message.reply(embed)
                    .then((message) => {
                        
                    });
            })
            .catch(err => console.log(err.data));
    
    }
});

client.login(config.BOT_TOKEN);