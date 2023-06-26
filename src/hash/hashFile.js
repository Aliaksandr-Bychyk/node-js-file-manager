import fixPath from "../utils/fixPath.js";
import { invalidInput, operationFailed } from '../utils/errorMessages.js';
import { createHash } from 'crypto';
import printText from '../utils/printText.js';
import { createReadStream } from 'node:fs';

const hashFile = async (input) => {
  if (input.length >= 2) {
    const PATH = fixPath(input[1]);
    const hash = createHash('sha256');
    const readableStream = createReadStream(PATH);

    readableStream.on('data', (data) => {
      hash.update(data);
    });

    readableStream.on('end', () => {
      printText(hash.digest('hex'));
    });

    readableStream.on('error', () => {
      operationFailed();
    });
  } else {
    invalidInput();
  }
}

export default hashFile;