import { invalidInput, operationFailed } from "../utils/errorMessages.js";
import fs from 'node:fs';
import { join, dirname, basename } from 'node:path';
import isAbsolutePath from "../utils/isAbsolutePath.js";
import printText from "../utils/printText.js";

const moveFile = async (input, isCopy) => {
  if (input.length >= 3) {
    const pathToFile = input[1].replace('/', '\\');
    const pathToDirectory = input[2].replace('/', '\\');
    const PATH = isAbsolutePath(pathToFile) ? pathToFile : join(global.dir, pathToFile);
    const PATH_END = isAbsolutePath(pathToDirectory) ? pathToDirectory : join(global.dir, pathToDirectory);
    
    const fileName = basename(PATH);

    const readableStream = fs.createReadStream(PATH, { encoding: 'utf-8' });
    const writableStream = fs.createWriteStream(join(PATH_END, fileName), { encoding: 'utf-8', flags: 'wx' });
    
    readableStream.pipe(writableStream);

    writableStream.on('finish', () => {
      if (isCopy) {
        printText('File copied successfully!', 'green');
      } else {
        fs.unlink(PATH, (error) => {
          if (error) {
            operationFailed();    
          } else {
            printText('File moved successfully!', 'green');
          }
        });
      }
    });

    writableStream.on('error', () => {
      operationFailed();
    });

  } else {
    invalidInput();
  }
}

export default moveFile;