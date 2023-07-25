
// global variables

let a = "";
let b = "";
let result = "";
let op = "";
let eq = "";
let tempa = "";
let tempb = "";
let lastButton = NaN;
let powerOn = true;

// function to reset global variables

const resetVariables = function() {
    a = "";
    b = "";
    op = "";
    eq = "";
    temp = "";
    updateDisplay();
}

const resetTemp = function () {
    tempa = 0;
    tempb = 0;
}

let powerUp = function() {
    if (powerOn) {
        powerOn = false;
        resetVariables();
        displayValue = "";
        updateDisplay();
    }
    else if (!powerOn) {
        displayValue = 0;
        powerOn = true;
    }
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
                                button === "/") ? true: false;

const isEquals = (button) => (button === "=") ? true : false;





// Display Value

let displayValue = 0;


const updateDisplay = () =>  {
    document.getElementById("outputResult").innerHTML = `${displayValue}`;
    document.getElementById("currentOperation").innerHTML = `${`${a} ${op} ${b} ${eq}`}`;
}

updateDisplay();

// Button Response

const buttons = document.querySelectorAll(".button")
buttons.forEach((button) => {
    button.addEventListener('click', function() {
        // delete function seperate to clear operators or digits
        if (button.id === "on") {
            powerUp();
        }
        else if (button.id === "delete") {
            if (isEquals(lastButton)) {
                return;
            }
            else if (isOperator(lastButton)) {
                op = "";
            }
            else if (typeof(lastButton === "number")) {
                
                if (b !== "") {
                    b = b.slice(0, b.length-1);
                    displayValue = b;
                }
                else {
                    a = a.slice(0, a.length-1); 
                    displayValue = a;
                }
            }
        }
        // check for non-digits or decimal place
        else if (isNaN(+button.id) && button.id !== ".") {
            // clear button
            if (button.id === "c") {
                console.log("clear")
                result = "";
                displayValue = 0;
                resetVariables();
            }
            else if (isEquals(button.id)) {
                if (b !== "") {
                    result = operate(+a, op, +b)
                    displayValue = (Math.round(result*100000))/100000
                    eq = "=";
                    resetVariables();
                }
                
                
            }
            else if (isOperator(button.id)) {
                if (result !== "") {
                    console.log("what?");
                    lastButton = button.id;
                    resetVariables();
                    a = result;
                    op = button.id;
                    result = "";
                }
                else if (b !== "") {
                    result = operate(+a, op, +b);
                    console.log("last");
                    displayValue = (Math.round(result*100000))/100000;
                    a = result;
                    b = "";
                    op = button.id;
                    result = "";
                    
                }
                else {
                    console.log("hmmm");
                    op = button.id;
                    displayValue = op;
                }
                

                
            }
        
        
            
        }

        // "number" conditionals, including decimal place
        else {
            if (result !== "") {
                
            }
            // "a" conditionals
            if (op === "") {
                if (isNaN(lastButton)) {
                    lastButton = button.id;
                    a = button.id;
                    displayValue = a;
                }
                else {
                    a = a + button.id;
                    displayValue = a;
                }
            }
            // "b" conditionals
            else {
                console.log("b-movie");
                if (isNaN(lastButton)) {
                    lastButton = button.id;
                    b = button.id;
                    displayValue = b;
                }
                else {
                    b = b + button.id;
                    displayValue = b;
                }
            }
            
        }
        updateDisplay();
        lastButton = button.id;
    })

});
            
// Variable input - ie. number, operator, number

// ORIGINAL CODE BELOW

/* if (button.id === "=") {
    if (result !== 0) {
        displayValue = result;
    }
    else {
        result = operate(+a, op, +b);
        displayValue = result;
        op = "";
        a = "";
        b = "";
        updateDisplay()

    }
}
else if (button.id === "c") {
    console.log("clear")
    resetVariables();
}
else if (button.id === "delete") {
    displayValue = displayValue.slice(0, displayValue.length-1);
    console.log(displayValue);
    updateDisplay();
}
else if (button.id === ".") {
    displayValue = displayValue + button.id;
    //currentOperation = currentOperation + button.id;
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
        //currentOperation = currentOperation + button.id;
        updateDisplay(`${button.id}`);
        op = displayValue;
        console.log(op);
    }
    else {
        a = displayValue;
        displayValue = button.id;
        //currentOperation = currentOperation + button.id;
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
    //currentOperation = currentOperation + button.id;
    updateDisplay(`${button.id}`);
    result = 0;
}
else if (a !== 0 && op !== "" && isNaN(button.id)) {
    console.log("new function");
    b = button.id;
    displayValue = operate(+a, op, +b);
    //currentOperation = currentOperation + button.id;
    updateDisplay();
    result = displayValue;
    console.log(result);
    op = "";
    b = 0;
}
else if (a !== 0 && op !== "") {
    console.log("new function");
    b = b + button.id;
    //currentOperation = currentOperation + button.id;
    displayValue = +b;
    updateDisplay();
}
else if (a !== 0 && op === "") {
    console.log("new function");
    b = b + button.id;
    //currentOperation = currentOperation + button.id;
    displayValue = +b;
    updateDisplay();
}
else {
    console.log(button.id)
    console.log("original");
    a = button.id;
    displayValue = displayValue + button.id;
    //currentOperation = currentOperation + button.id;
    updateDisplay(`${button.id}`);
}
}
});
}); */
