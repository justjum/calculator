
// global variables

let a = 0;
let b = 0;
let result = 0;
let op = "";
let tempa = 0;
let tempb = 0;

// function to reset global variables

const resetVariables = function() {
    a = 0;
    b = 0;
    result = 0;
    op = "";
    tempa = 0;
    tempb = 0;
}

const resetTemp = function () {
    tempa = 0;
    tempb = 0;
}


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

// function to check for operator

const isOperator = (button) => (button === "+" || 
                                button === "-" || 
                                button === "x" || 
                                button === "/" || 
                                button === "=") ? true: false;

const isEquals = (button) => (button === "=") ? true : false;


// Display Value

let displayValue = 0;
let currentOperation = "";

const updateDisplay = () =>  {
    document.getElementById("outputResult").innerHTML = `${displayValue}`;
    document.getElementById("currentOperation").innerHTML = `${currentOperation}`;
}

updateDisplay();

// Button Response

const buttons = document.querySelectorAll(".button")
buttons.forEach((button) => {
    button.addEventListener('click', function() {
        //console.log(button.id);
        if (isNaN(+button.id)){
            if (button.id === "=") {
                if (result !== 0) {
                    displayValue = result;
                }
                else {
                    result = operate(+a, op, +b);
                    displayValue = result;
                    currentOperation = "";
                    op = "";
                    updateDisplay()
                    a = 0;
                    b = 0;
                    op = "";
                }
            }
            else if (button.id === "c") {
                console.log("clear")
                a = 0;
                b = 0;
                op = 0;
                result = 0;
                displayValue = 0;
                currentOperation = "";
                updateDisplay();
            }
            else if (button.id === "delete") {
                displayValue = displayValue.slice(0, displayValue.length-1);
                console.log(displayValue);
                updateDisplay();
            }
            else if (button.id === ".") {
                displayValue = displayValue + button.id;
                currentOperation = currentOperation + button.id;
                updateDisplay();
            }
            else {
                if (op !== "" && currentOperation === "") {
                    console.log("need number");
                    return;
                }
                else if (currentOperation === "") {
                    console.log("currentoperation");
                    currentOperation = result;
                    a = result;
                }
                if (op !== "" && b !== 0) {
                    console.log("temp")
                    a = operate(+a, op, +b);
                }
                else if (op !== "" && isNaN(button.id)) {
                    op = button.id;
                    //console.log("change");
                    displayValue = button.id;
                    currentOperation = currentOperation + button.id;
                    updateDisplay(`${button.id}`);
                    op = displayValue;
                    console.log(op);
                }
                else {
                    a = displayValue;
                    displayValue = button.id;
                    currentOperation = currentOperation + button.id;
                    updateDisplay(`${button.id}`);
                    op = displayValue;
                    console.log(op);
                }
            }
            
            
        }
        else {
            if (displayValue === 0 || result !== 0) { //|| isNaN(displayValue) ||  {
                displayValue = button.id;
                console.log("this one");
                console.log(button.id)
                currentOperation = currentOperation + button.id;
                updateDisplay(`${button.id}`);
                result = 0;
            }
            else if (a !== 0 && op !== "" && isNaN(button.id)) {
                console.log("new function");
                b = button.id;
                displayValue = operate(+a, op, +b);
                currentOperation = currentOperation + button.id;
                updateDisplay();
                result = displayValue;
                console.log(result);
                op = "";
                b = 0;
            }
            else if (a !== 0 && op !== "") {
                console.log("new function");
                b = b + button.id;
                currentOperation = currentOperation + button.id;
                displayValue = +b;
                updateDisplay();
            }
            else if (a !== 0 && op === "") {
                console.log("new function");
                b = b + button.id;
                currentOperation = currentOperation + button.id;
                displayValue = +b;
                updateDisplay();
            }
            else {
                console.log(button.id)
                console.log("original");
                a = button.id;
                displayValue = displayValue + button.id;
                currentOperation = currentOperation + button.id;
                updateDisplay(`${button.id}`);
        }
        }
    });
});

// Variable input - ie. number, operator, number

