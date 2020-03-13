const OPERATIONS = {'*': 1, '/': 1, '+': 2, '-': 2};
function eval(result) {
    // Do not use eval!!!
    let value = 0;
    let temp = [];
    let i = 0;
    while (result.length > 0) {
        if (! (result[0] in OPERATIONS)) {
            temp.push(Number(result[i]));
        }
        switch (result[0]) {
            case '+':
                value = temp[temp.length - 2] + temp[temp.length - 1];
                temp.splice(temp.length - 2, 2, value);
                break;
            case '-':
                value = temp[temp.length - 2] - temp[temp.length - 1];
                temp.splice(temp.length - 2, 2, value);
                break;
            case '*':
                value = temp[temp.length - 2] * temp[temp.length - 1];
                temp.splice(temp.length - 2, 2, value);
                break;
            case '/':
                if (temp[1] === 0) {
                    throw Error("TypeError: Division by zero.");
                }
                value = temp[temp.length - 2] / temp[temp.length - 1];
                temp.splice(temp.length - 2, 2, value);
                break;
        }
        result.splice(0,1);
    }
    return value;
}

function expressionCalculator(expr) {
    // write your solution here
    let result = Array();
    let operations = Array();
    expr = expr.match(/(\d+|[+\/\-*])/g);
    expr.forEach( elem => {
        if (!(elem  in OPERATIONS)) {
            result.push(elem);
        }
        else if (operations.length === 0 || OPERATIONS[elem] < OPERATIONS[operations[operations.length - 1]]) {
            operations.push(elem);
        }
        else if (OPERATIONS[elem] > OPERATIONS[operations[operations.length - 1]]) {
            result = result.concat(operations.reverse());
            operations = [];
            operations.push(elem);
        }
        else {
            result.push(operations.pop());
            operations.push(elem);
        }
    });
    result= result.concat(operations.reverse());
    return eval(result);
}

module.exports = {
    expressionCalculator
}