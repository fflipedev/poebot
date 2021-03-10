const axios = require('axios');

class Request {
    constructor(url, body, method) {
        this.url = url;
        this.body = body;
        this.method = method;
    }
    async search() {
        try {
            const response = await axios({
                method: this.method,
                url: this.url,
                data: this.body
            });
            
            return response.data;
        } catch (err) {
            throw err;

            return;
        }
    }
}

module.exports = {
    Request
};