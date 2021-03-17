const fs = require('fs');

const items = require('./items.json');

const search = query =>  {
    const result = {};
    items['result'].forEach((item, i) => {
        item['entries'].forEach((nome, i) => {
           //comparar os arrays
           if(nome['name']) {
            let arrayNome = nome['name'].split();
            if(new String(arrayNome).toLowerCase() == query) {
                result.id = nome['name'];
                result.tipo = nome['type'];
            }
           }
        })
    })

    return result;
}

module.exports = {
    search
}


