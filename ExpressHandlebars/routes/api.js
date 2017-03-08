var express = require('express');
var router = express.Router();

var jokes = require('../models/jokes');

router.get('/jokes/random', function(req, res, next) {
  res.status(200).send(JSON.stringify(jokes.getRandomJoke()));
});

router.get('/jokes', function(req, res, next) {
  res.status(200).send(JSON.stringify(jokes.allJokes));
});

router.post('/jokes', function(req, res, next) {
  jokes.addJoke(req.body.joke);
  res.status(200).send(JSON.stringify(jokes.allJokes));
});

module.exports = router;
