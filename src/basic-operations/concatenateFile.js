import { join } from 'node:path';
import { createReadStream } from 'node:fs';
import printText from '../utils/printText.js';

const concatenateFile = async (arg) => {
  const PATH = arg.includes(':') && arg.includes('\\') ? arg : join(global.dir, arg);
  const readableStream = createReadStream(PATH, {encoding: 'utf-8'});
  try {
    for await (const content of readableStream) {
      printText(content);
    }
  } catch (error) {
    printText('ERROR: Invalid input', 'red');
  }
}

export default concatenateFile;