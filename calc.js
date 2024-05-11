const display = document.getElementById('result');
const expDisplay = document.getElementById('string');
let currentValue = '0';
let prevValue = '';
let operator = '';
let expression = '';
let isNewCalculation = true;

function appendValue(value) {
  if (currentValue.length >= 15) return;
  if (currentValue === '0' && value !== '.') {
    currentValue = value;
  } else {
    currentValue += value;
  }
  expression += value;
  updateExpDisplay();
  display.value = currentValue;
}

function clearDisplay() {
  currentValue = '0';
  prevValue = '';
  operator = '';
  expression = '';
  isNewCalculation = true;
  updateExpDisplay();
  display.value = currentValue;
}

function backspace() {
  currentValue = currentValue.slice(0, -1);
  expression = expression.slice(0, -1);
  if (currentValue === '') {
    currentValue = '0';
  }
  updateExpDisplay();
  display.value = currentValue;
}

function operate(op) {
  if (!currentValue) return;
  if (prevValue !== '') {
    prevValue = calculate();
    display.value = `${prevValue}`;
  } else {
    prevValue = currentValue;
  }
  operator = op;
  currentValue = '';
  isNewCalculation = false;
  updateExpDisplay();
}

function calculate() {
  const prev = parseFloat(prevValue);
  const current = parseFloat(currentValue);
  let result;
  switch (operator) {
    case '+':
      result = (prev + current).toString();
      break;
    case '-':
      result = (prev - current).toString();
      break;
    case '*':
      result = (prev * current).toString();
      break;
    case '/':
      result = current === 0 ? (clearDisplay(), 'Error: Division by zero') : (prev / current).toString();
      break;
    default:
      result = current.toString();
  }
  expression = '';
  return result;
}

function square() {
  const value = parseFloat(currentValue);
  currentValue = (value ** 2).toString();
  expression = `${value}^2`;
  updateExpDisplay();
  display.value = currentValue;
}

function squareRoot() {
  const value = parseFloat(currentValue);
  if (value < 0) {
    clearDisplay();
    display.value = 'Error: Square root of negative number';
  } else {
    currentValue = Math.sqrt(value).toString();
    expression = `√${value}`;
    updateExpDisplay();
    display.value = currentValue;
  }
}

function updateExpDisplay() {
  if (operator && prevValue && currentValue) {
    expDisplay.textContent = `${prevValue} ${operator} ${currentValue}`;
  } else if (operator && prevValue) {
    expDisplay.textContent = `${prevValue} ${operator}`;
  } else {
    expDisplay.textContent = expression;
  }
}

function handleKeydown(event) {
  const key = event.key;
  if (/\d/.test(key) || key === '.') {
    if (isNewCalculation) {
      clearDisplay();
      isNewCalculation = false;
    }
    appendValue(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    operate(key);
  } else if (['Enter', '='].includes(key)) {
    const result = calculate();
    display.value = result;
    prevValue = result;
    currentValue = result;
    operator = '';
    isNewCalculation = true;
    updateExpDisplay();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearDisplay();
  }
}

document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (button.classList.contains('digit')) {
      if (isNewCalculation) {
        clearDisplay();
        isNewCalculation = false;
      }
      appendValue(value);
    } else if (button.classList.contains('operator')) {
      const op = button.id;
      if (op === 'clear') {
        clearDisplay();
      } else if (op === 'backspace') {
        backspace();
      } else if (op === 'square') {
        square();
      } else if (op === 'sqrt') {
        squareRoot();
      } else {
        operate(value);
        operator = value;
      }
    } else if (button.id === 'equal') {
      const result = calculate();
      display.value = result;
      prevValue = result;
      currentValue = result;
      operator = '';
      isNewCalculation = true;
      updateExpDisplay();
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); 
  }
});

window.addEventListener('keydown', handleKeydown);
