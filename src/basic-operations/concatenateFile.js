import { join } from 'node:path';
import { createReadStream } from 'node:fs';
import printText from '../utils/printText.js';
import { invalidInput, operationFailed } from '../utils/errorMessages.js';

const concatenateFile = async (input) => {
  if (input.length >= 2) {
    const inputPath = input[1].replace('/', '\\');
    const PATH = inputPath.includes(':') && inputPath.includes('\\') ? inputPath : join(global.dir, inputPath);
    const readableStream = createReadStream(PATH, {encoding: 'utf-8'});
    try {
      for await (const content of readableStream) {
        printText(content);
      }
    } catch (error) {
      operationFailed();
    }
  } else {
    invalidInput();
  }
}

export default concatenateFile;