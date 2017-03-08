var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

/*app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
    //res.send('Hello world');
    //throw new Error('Oops');
});*/

var names = [];

app.get('/form', function(req, res) {
    res.render('form', { names: names });

    /*res.send('Hi: ' + names.join(', ') + '\n'
            + '<form method="post"><input type="text" name="name"></form>');*/
});

app.post('/form', function(req, res) {
    names.push(req.body.name);
    res.redirect('/form');
});

app.post('/names', function(req, res) {
    names.push(req.body);
    console.log(JSON.stringify(req.body));
    res.redirect('/form');
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;