
// global variables

let a = 0;
let b = 0;
let result = 0;
let op = "";


// Basic maths operations

const add = (a, b) => a+b;

const subtract = (a, b) => a-b;

const multiply = (a, b) => a*b;

const divide = (a, b) => a/b;

// Operate function taking three variables - number, operator, number

const operate = (a, op, b) => {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}


// Display Value

let displayValue = 0;

const updateDisplay = () => document.getElementById("currentOperation").innerHTML = `${displayValue}`;

updateDisplay();

// Button Response

const buttons = document.querySelectorAll(".button")
buttons.forEach((button) => {
    button.addEventListener('click', function() {
        //console.log(button.id);
        if (isNaN(+button.id)){
            if (button.id === "=") {
                b = displayValue;
                result = operate(+a, op, +b);
                displayValue = result;
                updateDisplay();
            }
            else if (button.id === "c") {
                displayValue = 0;
                updateDisplay();
            }
            else {
                a = displayValue;
                console.log(a);
                displayValue = button.id;
                updateDisplay(`${button.id}`);
                op = displayValue;
                console.log(op);
            }
            
            
        }
        else {
            if (displayValue === 0 || isNaN(displayValue)) {
                displayValue = button.id;
                updateDisplay(`${button.id}`);
            }
            else {
                displayValue = displayValue + button.id;
                updateDisplay(`${button.id}`);
        }
        }
    });
});

// Variable input - ie. number, operator, number

