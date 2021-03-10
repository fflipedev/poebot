const { Client, MessageEmbed, WebhookClient } = require('discord.js');
const config = require('./config.json');
const client = new Client();
const json = require('./colecao.js');
const { Request } = require('./request.js');
const prefixo = '!';

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

        const limit = 2; //limite de registros por pagina

        const getItems = new Request(url, body, 'post')
            .search()
            .then(response => {
                let count = 0;
                // console.log(response);
                const embed = new MessageEmbed()
                    .setTitle(`Resultado da Pesquisa - ${item}`)
                    .setColor(0xfcba03)
                    .setDescription(`Foram encontradas ${response.result.length} trocas em aberto`);

        
                    response.result.forEach(hash => { 
                        setTimeout(() => {
                            if(count >= limit) return;
    
                            const getItem = new Request(`https://www.pathofexile.com/api/trade/fetch/${hash}`, {}, 'get')
                                    .search()
                                    .then(item => {
                                        embed.addField(item['result'][0].item.name, `${item['result'][0].item.name} chaos`)
                                        console.log(item['result'][0].item.name)
                                    });
                                                
                            count++;
                        }, 3000)
                    });
                

                message.reply(embed)
                    .then((message) => {
                        message.react('⬅️');
                        message.react('➡️');
                    });
            })
            .catch(err => console.log(err.data));
    
    }
});

client.login(config.BOT_TOKEN);