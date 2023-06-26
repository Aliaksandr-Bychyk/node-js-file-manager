import process from 'node:process';
import os from 'node:os';

import printText from './utils/printText.js';
import showCurrentDir from './utils/showCurrentDir.js';

import upDirectory from './navigation/upDirectory.js';
import currentDirectory from './navigation/currentDirectory.js';
import listDirectory from './navigation/listDirectory.js';

import addFile from './basic-operations/addFile.js';
import renameFile from './basic-operations/renameFile.js';
import concatenateFile from './basic-operations/concatenateFile.js';

const USERNAME = getUsernameFromArgs(process.argv);
global.dir = os.homedir();

printText(`Welcome to the File Manager, ${USERNAME}!\n`);

process.stdin.setEncoding('utf8');

process.stdin.on('data', async (data) => {
  if (data !== null) {
    const input = data.trim().split(' ');
    switch (input[0]) {
      case '.exit':
        process.exit();
      case 'ls':
        await listDirectory();
        break;
      case 'up':
        await upDirectory();
        break;
      case 'cd':
        await currentDirectory(input);
        break;
      case 'cat':
        await concatenateFile(input[1].replace('/', '\\'));
        break;
      case 'add':
        await addFile(input[1]);
        break;
      case 'rn':
        await renameFile(input[1].replace('/', '\\'), input[2].replace('/', '\\'));
        break;
      default:
        printText('ERROR: Invalid input', 'red');
        showCurrentDir();
        break;
    }
    await showCurrentDir();
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