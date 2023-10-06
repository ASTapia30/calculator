let currentInput = "";
let firstValue = null;
let currentOperation = null;

function add(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

function subtract(...numbers) {
    return numbers.reduce((acc, curr) => acc - curr);
}

function multiply(...numbers) {
    return numbers.reduce((acc, curr) => acc * curr, 1);
}

function divide(...numbers) {
    return numbers.reduce((acc, curr) => acc / curr);
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

function positiveOrNegative() {
    if (currentInput.charAt(0) === '-') {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}


function setOperation(operator) {
    if (currentInput === "") return;

    if (firstValue !== null) {
        compute();
    }

    firstValue = parseFloat(currentInput);
    currentOperation = operator;
    currentInput = "";
}

function clearDisplay() {
    currentInput = "";
    firstValue = null;
    currentOperation = null;
    updateDisplay();
}

function compute() {
    if (firstValue === null || currentOperation === null) return;

    const secondValue = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            currentInput = String(operate('+', firstValue, secondValue));
            break;
        case '-':
            currentInput = String(operate('-', firstValue, secondValue));
            break;
        case '*':
            currentInput = String(operate('*', firstValue, secondValue));
            break;
        case '/':
            if (secondValue === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            currentInput = String(operate('/', firstValue, secondValue));
            break;
    }

    firstValue = null;
    currentOperation = null;
    updateDisplay();
}

function operate(operator, ...numbers) {
    switch (operator) {
        case '+':
            return add(...numbers);
        case '-':
            return subtract(...numbers);
        case '*':
            return multiply(...numbers);
        case '/':
            return divide(...numbers);
        default:
            throw new Error("Unknown operator");
    }
}