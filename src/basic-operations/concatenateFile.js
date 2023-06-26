import { createReadStream } from 'node:fs';
import printText from '../utils/printText.js';
import { invalidInput, operationFailed } from '../utils/errorMessages.js';
import fixPath from '../utils/fixPath.js';

const concatenateFile = async (input) => {
  if (input.length >= 2) {
    const PATH = fixPath(input[1]);
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