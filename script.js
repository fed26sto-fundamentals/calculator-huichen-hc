// Create variables for the calculator operation.
let firstNum = null;
let operator = null;
let secondNum = null;
let displayValue = '0'; 
let awaitingSecondNumber = false; 

const maxDisplayLength = 9;


// Functions for all of the basic math operators 
function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    if(b === 0){
        return "cao";
    }
    return a / b;
}


// Function to perform the operation
function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    } else {
        return "Error";
    }
}


// Update the calculator's display and control the length
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
    if (displayValue.length > maxDisplayLength) {
        display.textContent = displayValue.substring(0, maxDisplayLength);
    }
}

// Append numbers to the display
function appendNumber(number) {
    if (awaitingSecondNumber) {
        displayValue = number; // Start fresh for the second number
        awaitingSecondNumber = false; // Reset the flag
    } else {
        if (displayValue === '0') {
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
    updateDisplay();
}

// Handle operator click
function handleOperator(op) {
    if (operator && awaitingSecondNumber) {
        // If there's already an operator and we're waiting for the second number
        operator = op;
        return;
    }

    if (!firstNum) {
        firstNum = displayValue;
    } else if (operator) {
        secondNum = displayValue;
        let result = operate(operator, firstNum, secondNum);
        displayValue = result.toString();
        updateDisplay();
        firstNum = result;
    }
    
    operator = op;
    awaitingSecondNumber = true;
}

// Reset the calculator
function resetCalculator() {
    displayValue = '0';
    firstNum = null;
    secondNum = null;
    operator = null;
    awaitingSecondNumber = false;
    updateDisplay();
}


// Add the decimal point
function addDecimal(dot) {
    if (awaitingSecondNumber) {
        displayValue = '0' + dot;  
        awaitingSecondNumber = false;  
    } else if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
    updateDisplay();  
}



// Delete the last character from the display (Delete button)
function deleteLastCharacter() {
    if (displayValue.length === 1) {
        displayValue = '0'; 
    } else {
        displayValue = displayValue.slice(0, -1); // Remove the last character
    }
    updateDisplay();
}


function changeSign() {
    if (displayValue !== '0') {
        if (displayValue.startsWith('-')) {
            displayValue = displayValue.slice(1); // Remove the minus sign
        } else {
            displayValue = '-' + displayValue; // Add a minus sign
        }
        updateDisplay();
    }
}


// Add event listeners to number buttons
let numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(numButton => {
    numButton.addEventListener('click', () => {
        appendNumber(numButton.textContent);
    });
});

// Add event listeners to operator buttons
let operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(opButton => {
    opButton.addEventListener('click', () => {
        handleOperator(opButton.textContent);
    });
});

// Add event listener to the equals button
document.getElementById('equals').addEventListener('click', () => {
    if (!operator || awaitingSecondNumber) return; // Don't calculate if no operator
    secondNum = displayValue;
    let result = operate(operator, firstNum, secondNum);
    displayValue = result.toString();
    updateDisplay();
    firstNum = result;
    operator = null;
    awaitingSecondNumber = true; // Result becomes the firstNum for next calculation
});


// Add event listener to the clear button
document.getElementById('clear').addEventListener('click', resetCalculator);

 // Add event listener to the delete button
document.getElementById('delete').addEventListener('click', deleteLastCharacter); 

// Add event listener to the decimal button
document.getElementById('decimal').addEventListener('click', () => {
    addDecimal('.');
});

// Add event listener to the sign change button
document.getElementById('sign').addEventListener('click', changeSign);