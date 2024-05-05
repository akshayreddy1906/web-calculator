const display = document.getElementById('result');
let currentValue = '0';
let prevValue = '';
let operator = '';

function appendValue(value) {
  if (currentValue.length >= 15) return;
  if (currentValue === '0' && value !== '.') {
    currentValue = value;
  } else {
    currentValue += value;
  }
  display.value = currentValue;
}

function clearDisplay() {
  currentValue = '';
  prevValue = '';
  operator = '';
  display.value = currentValue;
}

function backspace() {
  currentValue = currentValue.slice(0, -1);
  if (currentValue === '') {
    currentValue = '0';
  }
  display.value = currentValue;
}

function operate(op) {
  if (!currentValue) return;
  if (prevValue !== '') {
    prevValue = calculate();
    display.value = `${prevValue}`;
  } else {
    prevValue = currentValue;
    display.value += ` ${op}`;
  }
  operator = op;
  currentValue = '';
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
      result = (current === 0) ? (clearDisplay(), 'Error: Division by zero') : (prev / current).toString();
      break;
    default:
      result = current.toString();
  }
  return result;
}

function square() {
  const value = parseFloat(currentValue);
  currentValue = (value ** 2).toString();
  display.value = currentValue;
}

function squareRoot() {
  const value = parseFloat(currentValue);
  if (value < 0) {
    clearDisplay();
    display.value = 'Error: Square root of negative number';
  } else {
    currentValue = Math.sqrt(value).toString();
    display.value = currentValue;
  }
}

function handleKeydown(event) {
  const key = event.key;
  if (/\d/.test(key) || key === '.') {
    appendValue(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    operate(key);
  } else if (['Enter', '='].includes(key)) {
    const result = calculate();
    display.value = result;
    prevValue = '';
    currentValue = result;
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearDisplay();
  }
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (button.classList.contains('digit')) {
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
      }
    } else if (button.id === 'equal') {
      const result = calculate();
      display.value = result;
      prevValue = '';
      currentValue = result;
    }
  });
});

window.addEventListener('keydown', handleKeydown);
