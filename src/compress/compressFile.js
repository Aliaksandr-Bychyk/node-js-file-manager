import { invalidInput, operationFailed } from "../utils/errorMessages.js";
import { unlink, createReadStream, createWriteStream } from 'node:fs';
import { join, basename } from 'node:path';
import isAbsolutePath from "../utils/isAbsolutePath.js";
import printText from "../utils/printText.js";
import { createBrotliDecompress, createBrotliCompress } from 'node:zlib';
import { pipeline } from "node:stream";

const compressFile = async (input, isDecompress) => {
  if (input.length >= 3) {
    const pathToFile = input[1].replace('/', '\\');
    const pathToDirectory = input[2].replace('/', '\\');
    const PATH = isAbsolutePath(pathToFile) ? pathToFile : join(global.dir, pathToFile);
    const PATH_END = isAbsolutePath(pathToDirectory) ? pathToDirectory : join(global.dir, pathToDirectory);
    
    const fileName = isDecompress ? `${basename(PATH).slice(0, -3)}` : `${basename(PATH)}.br`;
    
    const brotli = isDecompress ? createBrotliDecompress() : createBrotliCompress();
    const readableStream = createReadStream(PATH);
    const writableStream = createWriteStream(join(PATH_END, fileName));

    pipeline(
      readableStream,
      brotli,
      writableStream,
      (error) => {
        if (error) {
          operationFailed();
          unlink(join(PATH_END, fileName), () => {});
        } else {
          printText(`${isDecompress ? 'Dec' : 'C'}ompression complete successfully.`, 'green');
        }
      }
    )

  } else {
    invalidInput();
  }
}

export default compressFile;