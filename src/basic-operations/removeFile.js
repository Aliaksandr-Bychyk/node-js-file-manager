import { unlink } from 'node:fs/promises';
import printText from '../utils/printText.js';
import { invalidInput, operationFailed } from '../utils/errorMessages.js';
import fixPath from '../utils/fixPath.js';

const removeFile = async (input) => {
  if (input.length >= 2) {
    const PATH = fixPath(input[1]);
    await unlink(PATH)
      .then(() => printText('File removed successfully', 'green'))
      .catch(() => operationFailed());
  } else {
    invalidInput();
  }
}

export default removeFile;