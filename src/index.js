const OPERATIONS = {'*': 1, '/': 1, '+': 2, '-': 2};

function top(array, pos = 1) {
    return array[array.length - pos];
}

function eval(result) {
    // Do not use eval!!!
    let value = 0;
    let temp = [];
    while (result.length > 0) {
        if (!(result[0] in OPERATIONS)) {
            temp.push(Number(result[0]));
        }
        switch (result[0]) {
            case '+':
                value = top(temp, 2) + top(temp);
                temp.splice(temp.length - 2, 2, value);
                break;
            case '-':
                value = top(temp, 2) - top(temp);
                temp.splice(temp.length - 2, 2, value);
                break;
            case '*':
                value = top(temp, 2) * top(temp);
                temp.splice(temp.length - 2, 2, value);
                break;
            case '/':
                value = top(temp, 2) / top(temp);
                temp.splice(temp.length - 2, 2, value);
                break;
        }
        result.splice(0, 1);
    }
    return value;
}

function expressionCalculator(expr) {
    // write your solution here
    let result = Array();
    let operations = Array();
    let last_bracket_flag = 0;
    if (expr.indexOf('/ 0') >= 0) {
        throw Error("TypeError: Division by zero.");
    }
    expr = expr.match(/(\d+|[+\/\-*()])/g);
    expr.forEach(elem => {
        if (!(elem in OPERATIONS) && elem !== '(' && elem !== ')') {
            result.push(elem);
        } else if (elem === '(') {
            operations.push(elem);
            last_bracket_flag = result.length;
        } else if (elem === ')') {
            let temp = operations.splice(operations.lastIndexOf('(') + 1, operations.length - operations.lastIndexOf('(') - 1);
            result = result.concat(temp.reverse());
            if (operations.length === 0) {
                throw Error("ExpressionError: Brackets must be paired");
            }
            operations.pop();
        } else if (operations.length === 0 || OPERATIONS[elem] < OPERATIONS[top(operations)] || top(operations) === '(') {
            operations.push(elem);
        } else if (OPERATIONS[elem] > OPERATIONS[top(operations)]) {
            if (operations.lastIndexOf('(') > -1) {
                result = result.concat(operations.splice(operations.lastIndexOf('(') + 1, operations.length - operations.lastIndexOf('(') - 1).reverse());
            } else {
                result = result.concat(operations.reverse());
                operations = [];
            }
            operations.push(elem);
        } else {
            result.push(operations.pop());
            operations.push(elem);
        }
    });
    result = result.concat(operations.reverse());
    if (result.includes('(')) {
        throw Error("ExpressionError: Brackets must be paired");
    }
    return eval(result);
}

module.exports = {
    expressionCalculator
}