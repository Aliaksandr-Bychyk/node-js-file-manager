import { access, constants } from 'node:fs/promises';
import { invalidInput, operationFailed } from '../utils/errorMessages.js';
import fixPath from '../utils/fixPath.js';

const currentDirectory = async (input) => {
  if (input.length >= 2) {
    const PATH = fixPath(input[1]);
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