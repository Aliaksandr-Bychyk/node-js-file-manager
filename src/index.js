import process from 'node:process';
import { homedir } from 'node:os';

import printText from './utils/printText.js';
import showCurrentDir from './utils/showCurrentDir.js';
import { invalidInput } from './utils/errorMessages.js';

import upDirectory from './navigation/upDirectory.js';
import currentDirectory from './navigation/currentDirectory.js';
import listDirectory from './navigation/listDirectory.js';

import addFile from './basic-operations/addFile.js';
import renameFile from './basic-operations/renameFile.js';
import concatenateFile from './basic-operations/concatenateFile.js';
import moveFile from './basic-operations/moveFile.js';
import removeFile from './basic-operations/removeFile.js';

import operatingSystem from './operating-system/operatingSystem.js';

import hashFile from './hash/hashFile.js';

import compressFile from './compress/compressFile.js';

const USERNAME = getUsernameFromArgs(process.argv);
global.dir = homedir();

printText(`Welcome to the File Manager, ${USERNAME}!`);
showCurrentDir();

process.stdin.setEncoding('utf8');

process.stdin.on('data', async (data) => {
  if (data !== null) {
    const input = data.trim().split(' ');
    const commands = [
      { name: '.exit', function: () => process.exit() },
      { name: 'up', function: () => upDirectory() },
      { name: 'cd', function: () => currentDirectory(input) },
      { name: 'ls', function: () => listDirectory() },
      { name: 'cat', function: () => concatenateFile(input) },
      { name: 'add', function: () => addFile(input) },
      { name: 'rn', function: () => renameFile(input) },
      { name: 'cp', function: () => moveFile(input, true) },
      { name: 'mv', function: () => moveFile(input, false) },
      { name: 'rm', function: () => removeFile(input) },
      { name: 'os', function: () => operatingSystem(input) },
      { name: 'hash', function: () => hashFile(input) },
      { name: 'compress', function: () => compressFile(input, false) },
      { name: 'decompress', function: () => compressFile(input, true) },
    ];
    if (commands.filter(e => e.name === input[0]).length > 0) {
      commands.map(async (command) => {
        if (command.name === input[0]) {
          await command.function();
          showCurrentDir();
        }
      });
    } else {
      invalidInput();
    }
  }
});

process.on('SIGINT', () => {
  process.exit();
})
process.on('exit', () => {
  printText(`\nThank you for using File Manager, ${USERNAME}, goodbye!`);
})

function getUsernameFromArgs(args) {
  const USERNAME_FLAG = args.find(el => el.includes('--username'));
  return USERNAME_FLAG ? USERNAME_FLAG.slice(11) : 'User';
}