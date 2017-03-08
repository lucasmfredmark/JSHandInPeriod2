var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/calculator/:operation/:n1/:n2', function(req, res, next) {
    var calculatorRequest = {
        operation: req.params.operation,
        n1: Number(req.params.n1),
        n2: Number(req.params.n2)
    };

    req.calculatorRequest = calculatorRequest;
    next();
});

app.get('/api/calculator/*', function(req, res) {
    var calc = req.calculatorRequest;

    if (calc.operation === 'add') {
        var result = (calc.n1 + calc.n2).toString();
        res.status(200).send(result);
    } else if (calc.operation === 'sub') {
        var result = (calc.n1 - calc.n2).toString();
        res.status(200).send(result);
    } else if (calc.operation === 'mul') {
        var result = (calc.n1 * calc.n2).toString();
        res.status(200).send(result);
    } else if (calc.operation === 'div') {
        var result = (calc.n1 / calc.n2).toString();
        res.status(200).send(result);
    }
});

app.listen(3000, function() {
    console.log('Server started, listening on port: ' + 3000);
});