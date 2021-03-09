const axios = require('axios');

const search = async (url, body, method) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            data: body
        });
        
        return response;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    search
};