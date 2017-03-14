const expect = require('chai').expect;
const http = require('http');
const request = require('request');

var server;
const app = require('../app');
const port = 3000;

var jokes;

describe('Testing Joke API', function() {
    before(function(done) {
        server = http.createServer(app);
        server.listen(port, function() {
            done();
        });
    });

    beforeEach(function() {
        jokes = require('../models/jokes'); // does not re-require the module, node caching?
        console.log(jokes.allJokes.length); // prints 4 before running last test
    });

    describe('GET: /jokes/random', function() {
        it('should return a random joke from all the jokes', function(done) {
            request.get('http://localhost:' + port + '/api/jokes/random', function(error, response, body) {
                const randomJoke = JSON.parse(body);
                expect(jokes.allJokes).to.include(randomJoke);
                done();
            });
        });
    });

    describe('POST: /api/jokes', function() {
        it('should return all the jokes with the new one added', function(done) {
            const jokesCount = jokes.allJokes.length;
            const options = {
                url: 'http://localhost:' + port + '/api/jokes',
                method: 'POST',
                json: true,
                body: { joke: 'It\'s better to be late than to arrive ugly.' }
            };

            request(options, function(error, res, body) {
                const newJokesCount = body.length;
                expect(newJokesCount).to.be.equal(jokesCount + 1);
                done();
            });
        });
    });

    describe('GET: /api/jokes', function() {
        it('should return all the jokes', function(done) {
            request.get('http://localhost:' + port + '/api/jokes', function(error, response, body) {
                const allJokes = JSON.parse(body);
                expect(jokes.allJokes).to.deep.equal(allJokes);
                done();
            });
        });
    });

    after(function(done) {
        server.close();
        done();
    });
});