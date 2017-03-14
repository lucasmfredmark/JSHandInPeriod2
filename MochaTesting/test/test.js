const expect = require('chai').expect;
const calculator = require('../lib/calculator');

describe('Calculator', function() {
    describe('#add', function() {
        it('should return the numbers added', function() {
            expect(calculator.add(2, 7)).to.be.equal(9);
        });
    });

    describe('#sub', function() {
        it('should return the numbers subtracted', function() {
            expect(calculator.sub(8, 3)).to.be.equal(5);
        });
    });

    describe('#mul', function() {
        it('should return the numbers multiplied', function() {
            expect(calculator.mul(3, 4)).to.be.equal(12);
        });
    });

    describe('#div', function() {
        it('should return the numbers divided', function() {
            expect(calculator.div(21, 3)).to.be.equal(7);
        });
    });
});