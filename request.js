const axios = require('axios');

class Request {
    constructor (url, body, method) {
        this.url = url;
        this.body = body;
        this.method = method;
    }

    searchRequest() {
        return new Promise((resolve, reject) => {
            try {
                let response = axios({
                    method: this.method,
                    url: this.url,
                    data: this.body
                });
                resolve(response);
            } catch (err) {
                reject(err);
            }
        })  
    }
}


module.exports = Request;