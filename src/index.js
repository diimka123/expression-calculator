function eval() {
    // Do not use eval!!!
    return;
}

function checkBrackets(expr) {

    let bracketsCount = 0;

    for (let i = 0; i < expr.length; i++) {

        if (expr[i] === '(') {
            bracketsCount++;
        } else if (expr[i] === ')') {
            bracketsCount--;
        }

        if (bracketsCount < 0) {
            return false;
        }

    }

    return bracketsCount === 0;
}

function checkPriority(oper) {
    if (oper === '+' || oper === '-') return 1;
    if (oper === '*' || oper === '/') return 2;
    return 0;
}

function simpleCalculate(val1, val2, oper) {
    if (oper === '+') return val1 + val2;
    if (oper === '-') return val1 - val2;
    if (oper === '*') return val1 * val2;
    if (oper === '/') {
        if (val2 === 0) throw new Error('TypeError: Division by zero.');
        return val1 / val2;
    }
}

function expressionCalculator(expr) {
    console.log(expr);
    expr = expr.split(' ').join('');
    if (!checkBrackets(expr)) throw new Error('ExpressionError: Brackets must be paired');
    let operStack = [];
    let valuesStack = [];

    for (let i = 0; i < expr.length; i++) {

        if (expr[i] === '(') {

            operStack.push('(');

        } else if (/\d/.test(expr[i])) {

            let value = '';

            while (/\d/.test(expr[i]) && expr.length > i) {
                value += expr[i];
                i++;
            }
            i--;
            valuesStack.push(Number(value));

        } else if (expr[i] === ')') {

            while (operStack.length !== 0 && operStack[operStack.length - 1] !== '(') {
                let oper = operStack.pop();
                let value2 = valuesStack.pop();
                let value1 = valuesStack.pop();
                let value = simpleCalculate(value1, value2, oper);
                valuesStack.push(value);
            }
            if (operStack.length !== 0) {
                operStack.pop();
            }

        } else {
            while (operStack.length !== 0 && checkPriority(operStack[operStack.length - 1]) >= checkPriority(expr[i])) {
                let oper = operStack.pop();
                let value2 = valuesStack.pop();
                let value1 = valuesStack.pop();
                let value = simpleCalculate(value1, value2, oper);
                valuesStack.push(value);
            }
            operStack.push(expr[i]);
        }

    }

    while (operStack.length !== 0) {
        let oper = operStack.pop();
        let value2 = valuesStack.pop();
        let value1 = valuesStack.pop();
        let value = simpleCalculate(value1, value2, oper);
        valuesStack.push(value);
    }

    return valuesStack.pop();
}

module.exports = {
    expressionCalculator
}