import { join, dirname } from 'node:path';
import { rename } from 'node:fs/promises';
import printText from "../utils/printText.js";
import { invalidInput, operationFailed } from '../utils/errorMessages.js';
import fixPath from '../utils/fixPath.js';

const renameFile = async (input) => {
  if (input.length >= 3) {
    const newFilename = input[2];
    const PATH = fixPath(input[1]);
    await rename(PATH, join(dirname(PATH), newFilename))
      .then(() => {
        printText('File renamed successfully!', 'green');
      })
      .catch(() => {
        operationFailed();
      });
  } else {
    invalidInput();
  }
}

export default renameFile;