import { access, constants } from 'node:fs/promises';
import { join } from 'node:path';
import invalidInput from '../utils/invalidInput.js';

const currentDirectory = async (input) => {
  if (input.length === 2) {
    const inputPath = input[1].replace('/', '\\');
    const PATH = inputPath.includes(':') && inputPath.includes('\\') ? inputPath : join(global.dir, inputPath);
    await access(PATH, constants.F_OK)
      .then(() => {
        global.dir = PATH;
      })
      .catch(() => {
        invalidInput();
      });
  } else {
    invalidInput();
  }
}

export default currentDirectory;