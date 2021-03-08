const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const json = require('./colecao.js');
const Request = require('./request.js');

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
        const pesquisa = json.search(args.join(' '));
        
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

        console.log(body)
        
        let getItemsApi = new Request(url, body, 'post');

        getItemsApi.searchRequest()
            .then(ofertas => {
                console.log(ofertas.data['result']).slice(-1);
                // ofertas.data['result'].slice(-1).forEach((hash, index) => {
                //     let getInfo = new Request(`https://www.pathofexile.com/api/trade/fetch/${hash}`, {}, 'get')
                //     getInfo.searchRequest().then(response => console.log(response.data['result']))
                //     .catch(err => console.log(err));
                // })
            })
            .catch(error => {
                console.log(error);
            });
    }
});

client.login(config.BOT_TOKEN);