const request = require('request');

function getAvailableTickets(airport, date, numberOfTickets, callback) {
    const url = `http://angularairline-plaul.rhcloud.com/api/flightinfo/${airport}/${date.toISOString()}/${numberOfTickets}`;

    request(url, function(error, response, body) {
        if (error || response.statusCode >= 400) {
            return callback(error || body);
        }

        callback(null, JSON.parse(body));
    });
}

module.exports = {
    getAvailableTickets: getAvailableTickets
};