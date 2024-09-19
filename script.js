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
        return "Error: Division by zero";
    }
    return a / b;
}

//Create three variables for the calculator operation. 
let firstNum = null;
let operator = null;
let secondNum = null;
let operators = ["+", "-", "*", "/"];


function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    } else {
        return "Error: Invalid operator";
    }
}


// Calculator's dispaly. When user clicks the number buttons, it populate the display.
let displayValue = '0';

function updateDisplay(){
    document.getElementById('display').textContent = displayValue;
}

function appendNumber(number) {
  if (displayValue === '0') {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

// Add event listeners to number buttons
document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
  });
}); 
