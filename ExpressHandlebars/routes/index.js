var express = require('express');
var router = express.Router();

var jokes = require('../models/jokes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', username: req.session.username });
});

router.get('/joke', function(req, res, next) {
  if (!req.session.jokeCount) {
    req.session.jokeCount = 0;
  }
  console.log('/joke route invoked ' + (++req.session.jokeCount) + ' times.');
  res.render('joke', { joke: jokes.getRandomJoke() });
});

router.get('/jokes', function(req, res, next) {
  if (!req.session.jokesCount) {
    req.session.jokesCount = 0;
  }
  console.log('/jokes route invoked ' + (++req.session.jokesCount) + ' times.');
  res.render('jokes', { jokes: jokes.allJokes });
});

router.get('/addjoke', function(req, res, next) {
  if (!req.session.addJokeCount) {
    req.session.addJokeCount = 0;
  }
  console.log('/addjoke route invoked ' + (++req.session.addJokeCount) + ' times.');
  res.render('addjoke');
});

router.post('/storejoke', function(req, res, next) {
  if (!req.session.storeJokeCount) {
    req.session.storeJokeCount = 0;
  }
  console.log('/storejoke route invoked ' + (++req.session.storeJokeCount) + ' times.');
  jokes.addJoke(req.body.joke);
  res.redirect('addjoke');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
