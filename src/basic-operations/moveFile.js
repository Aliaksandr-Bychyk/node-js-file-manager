import { invalidInput, operationFailed } from "../utils/errorMessages.js";
import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { join, basename } from 'node:path';
import fixPath from "../utils/fixPath.js";
import printText from "../utils/printText.js";
import { pipeline } from "node:stream";

const moveFile = async (input, isCopy) => {
  if (input.length >= 3) { 
    const PATH = fixPath(input[1]);
    const PATH_END = fixPath(input[2]);
    
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