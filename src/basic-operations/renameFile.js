import path from 'node:path';
import fs from 'node:fs/promises';
import printText from "../utils/printText.js";

const renameFile = async (pathToFile, newFilename) => {
  const PATH = pathToFile.includes(':') && pathToFile.includes('\\') ? pathToFile : path.join(dir, pathToFile);
  // console.log(PATH, path.join(path.dirname(PATH), newFilename));
  await fs.rename(PATH, path.join(path.dirname(PATH), newFilename))
    .then(() => {
      printText('File renamed!');
    })
    .catch(() => {
      printText('ERROR: Invalid input', 'red');
    });
}

export default renameFile;