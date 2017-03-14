module.exports = {
    add: (n1, n2) => n1 + n2,
    sub: (n1, n2) => n1 - n2,
    mul: (n1, n2) => n1 * n2,
    div: (n1, n2) => {
        if (n2 == 0) throw new Error('Attempt to divide by zero.');
        return n1 / n2;
    }
};