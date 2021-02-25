const fs = require('fs');

const JSON = require('./items.json');

exports.search = function(query) {
    const data = {};
    JSON['result'].forEach((item, i) => {
        item['entries'].forEach((nome, i) => {
            if(nome['name'] && nome['name'] === query) {
                data.name = nome['name'];
                data.type = nome['type'];
            }
        })
    })

    return data;
}


