const textFormat = (text, format) => {
  switch (format) {
    case 'red':
      return `\x1b[31m${text}\x1b[89m\n\x1b[37m\x1b[89m`
      break;
    case 'yellow':
      return `\x1b[33m${text}\x1b[89m\n\x1b[37m\x1b[89m`
      break;
    default:
      return `\x1b[37m${text}\x1b[89m\n`
      break;
  }
}

export default textFormat;