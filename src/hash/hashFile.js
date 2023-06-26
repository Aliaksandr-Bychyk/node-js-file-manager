import { join } from 'node:path';
import isAbsolutePath from "../utils/isAbsolutePath.js";
import { invalidInput, operationFailed } from '../utils/errorMessages.js';
import { createHash } from 'crypto';
import printText from '../utils/printText.js';
import { createReadStream } from 'node:fs';

const hashFile = async (input) => {
  if (input.length >= 2) {
    const inputPath = input[1].replace('/', '\\');
    const PATH = isAbsolutePath(inputPath) ? inputPath : join(global.dir, inputPath);
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