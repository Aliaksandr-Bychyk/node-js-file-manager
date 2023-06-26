import printText from './printText.js';

const invalidInput = () => {
  printText('ERROR: Invalid input!', 'red');
}
const operationFailed = () => {
  printText('ERROR: Operation failed!', 'red');
}

export { invalidInput, operationFailed };