const request = require('request');
const url = 'http://jokes-plaul.rhcloud.com/api/joke';

function getJoke(callback) {
    request(url, function(error, response, body) {
        if (error || response.statusCode >= 400) {
            return callback(error || body);
        }

        callback(null, JSON.parse(body));
    });
}

module.exports = {
    getJoke: getJoke
};