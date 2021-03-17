const { Request } = require('./request.js');
const json = require('./colecao.js');

async function getHashs(consulta, callback) {
    const pesquisa = json.search(consulta);
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

    const request = new Request(url, body, 'post');
    const response = await request.search();

    const data = []
    for(hash in response.result) {
        let res = await getItemHash(response.result[hash]);

        data.push({
            nome: res.result[0].item.name,
            price: `${res.result[0].listing.price.amount} ${res.result[0].listing.price.currency}`,
        });
    }

    callback(data); 
}

async function getItemHash(hash) {
    let url = `https://www.pathofexile.com/api/trade/fetch/${hash}`;
    const request = new Request(url, {}, 'get');
    const item = await request.search();
    return item;
}

module.exports = {
    getHashs
}