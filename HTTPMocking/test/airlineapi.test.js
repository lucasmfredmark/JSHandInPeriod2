const expect = require('chai').expect;
const nock = require('nock');
const airlineapi = require('../lib/airlineapi');

const apiUrl = 'http://angularairline-plaul.rhcloud.com/';
const testFlightInfo = {
    airline: 'AngularJS Airline',
    flights: [
        {
            flightID: 'COL2215x100x2016-03-09T08:00:00.000Z',
            numberOfSeats: 4,
            date: '2016-03-09T08:00:00.000Z',
            totalPrice: 340,
            traveltime: 60,
            origin: 'SXF',
            destination: 'CPH'
        }
    ]
};

describe('Testing Airline API', function() {
    before(function(done) {
        nock(apiUrl).get('/api/flightinfo/SXF/2016-03-09T00:00:00.000Z/4').reply(200, testFlightInfo);
        done();
    });

    it('should fetch the flight info', function(done) {
        airlineapi.getAvailableTickets('SXF', new Date('2016-03-09'), 4, function(err, flightInfo) {
            if (err) throw err;

            expect(flightInfo).to.deep.equal(testFlightInfo);
            done();
        });
    });
});