import { access, constants } from 'node:fs/promises';
import { join } from 'node:path';
import { invalidInput, operationFailed } from '../utils/errorMessages.js';

const currentDirectory = async (input) => {
  if (input.length >= 2) {
    const inputPath = input[1].replace('/', '\\');
    const PATH = inputPath.includes(':') && inputPath.includes('\\') ? inputPath : join(global.dir, inputPath);
    await access(PATH, constants.F_OK)
      .then(() => {
        global.dir = PATH;
      })
      .catch(() => operationFailed());
  } else {
    invalidInput();
  }
}

export default currentDirectory;