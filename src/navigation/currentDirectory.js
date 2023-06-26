import { access, constants } from 'node:fs/promises';
import { join } from 'node:path';
import printText from '../utils/printText.js';

const currentDirectory = async (pathTo) => {
  const PATH = pathTo.includes(':') && pathTo.includes('\\') ? pathTo : join(global.dir, pathTo);
  await access(PATH, constants.F_OK)
    .then(() => {
      global.dir = PATH;
    })
    .catch(() => {
      printText('ERROR: Invalid input', 'red');
    });
}

export default currentDirectory;