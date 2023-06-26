import { invalidInput, operationFailed } from "../utils/errorMessages.js";
import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { join, basename } from 'node:path';
import isAbsolutePath from "../utils/isAbsolutePath.js";
import printText from "../utils/printText.js";
import { pipeline } from "node:stream";

const moveFile = async (input, isCopy) => {
  if (input.length >= 3) {
    const pathToFile = input[1].replace('/', '\\');
    const pathToDirectory = input[2].replace('/', '\\');
    const PATH = isAbsolutePath(pathToFile) ? pathToFile : join(global.dir, pathToFile);
    const PATH_END = isAbsolutePath(pathToDirectory) ? pathToDirectory : join(global.dir, pathToDirectory);
    
    const fileName = basename(PATH);

    const readableStream = createReadStream(PATH, { encoding: 'utf-8' });
    const writableStream = createWriteStream(join(PATH_END, fileName), { encoding: 'utf-8' });

    pipeline(
      readableStream,
      writableStream,
      (error) => {
        if (error) {
          operationFailed();  
          unlink(join(PATH_END, fileName), () => {});
        } else {
          printText('File copied successfully!', 'green');
          if (!isCopy) {
            unlink(PATH, () => {});
          }
        }

      }
    );

  } else {
    invalidInput();
  }
}

export default moveFile;