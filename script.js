// script.js
let displayValue = '';
let history = [];

function updateDisplay(value) {
  const display = document.getElementById('display');
  display.textContent = value || '0';
}

function appendNumber(number) {
  displayValue += number;
  updateDisplay(displayValue);
}

function appendOperator(operator) {
  if (displayValue === '') return;
  const lastChar = displayValue[displayValue.length - 1];
  if (['+', '-', '*', '/', '%'].includes(lastChar)) return;
  displayValue += operator;
  updateDisplay(displayValue);
}

function clearDisplay() {
  displayValue = '';
  updateDisplay(displayValue);
}

function deleteDigit() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay(displayValue);
}

function calculate() {
  try {
    const result = eval(displayValue).toString();
    addToHistory(displayValue, result);
    displayValue = result;
    updateDisplay(displayValue);
  } catch {
    updateDisplay('Error');
    displayValue = '';
  }
}

function addToHistory(expression, result) {
  const historyList = document.getElementById('history-list');
  const historyItem = document.createElement('li');
  historyItem.textContent = `${expression} = ${result}`;
  history.unshift({ expression, result });
  historyList.prepend(historyItem);

  // Limit history to the last 10 calculations
  if (history.length > 10) {
    history.pop();
    historyList.removeChild(historyList.lastChild);
  }
}
