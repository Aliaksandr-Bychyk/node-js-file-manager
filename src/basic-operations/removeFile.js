import { join } from 'node:path';
import { unlink } from 'node:fs/promises';
import printText from '../utils/printText.js';
import { invalidInput, operationFailed } from '../utils/errorMessages.js';
import isAbsolutePath from '../utils/isAbsolutePath.js';

const removeFile = async (input) => {
  if (input.length >= 2) {
    const inputPath = input[1].replace('/', '\\');
    const PATH = isAbsolutePath(inputPath) ? inputPath : join(global.dir, inputPath);
    await unlink(PATH)
      .then(() => printText('File removed successfully', 'green'))
      .catch(() => operationFailed());
  } else {
    invalidInput();
  }
}

export default removeFile;