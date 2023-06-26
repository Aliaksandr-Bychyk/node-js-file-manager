import process from 'node:process';

const setColor = (text, first = 37, second = 89) => {
  return `\x1b[${first}m${text}\x1b[${second}m\n\x1b[37m\x1b[89m`
}

const printText = (text, format) => {
  let formattedText = '';
  switch (format) {
    case 'red':
      formattedText = setColor(text, 31, 89);
      break;
    case 'yellow':
      formattedText = setColor(text, 33, 89);
      break;
    default:
      formattedText = setColor(text);
      break;
  }
  return process.stdout.write(formattedText)
}

export default printText;