import { join } from 'node:path';
import { writeFile } from 'node:fs/promises' 
import printText from '../utils/printText.js';

const addFile = async (filename) => {
  try {
    await writeFile(join(global.dir, filename), '')
      .then(() => {
        printText('File created!');
      })
  } catch (error) {
    printText('ERROR: Invalid input', 'red');
  }
}

export default addFile;