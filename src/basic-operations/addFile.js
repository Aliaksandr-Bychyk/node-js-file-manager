import { join } from 'node:path';
import { writeFile } from 'node:fs/promises' 
import printText from '../utils/printText.js';
import { invalidInput, operationFailed } from '../utils/errorMessages.js';

const addFile = async (input) => {
  if (input.length >= 2) {
    await writeFile(join(global.dir, input[1]), '', {flag: 'wx'})
      .then(() => printText('File created successfully!', 'green'))
      .catch(() => operationFailed());
  } else {
    invalidInput();
  }
}

export default addFile;