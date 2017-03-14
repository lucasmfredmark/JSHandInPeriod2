const expect = require('chai').expect;
const nock = require('nock');
const jokeapi = require('../lib/jokeapi');

const apiUrl = 'http://jokes-plaul.rhcloud.com';
const testJoke = { id: 1234, joke: 'ha ha ha', reference: 'unknown' };

describe('Testing Joke API', function() {
    before(function(done) {
        nock(apiUrl).get('/api/joke').reply(200, testJoke);
        done();
    });

    it('should fetch the vampire joke', function(done) {
        jokeapi.getJoke(function(err, joke) {
            if (err) throw err;

            expect(joke).to.deep.equal(testJoke);
            done();
        });
    });
});