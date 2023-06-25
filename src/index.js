import process from 'node:process';
import os from 'node:os';
import fs from 'node:fs/promises';
import path from 'node:path';
import textFormat from './textFormat.js';

const USERNAME = getUsernameFromArgs(process.argv);
let dir = os.homedir();

process.stdout.write(textFormat(`Welcome to the File Manager, ${USERNAME}!\n`));

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
  if (data !== null) {
    const input = data.trim();
    switch (input) {
      case '.exit':
        process.exit();
        break;
      case 'ls':
        listDirectory();
        break;
      case 'up':
        upDirectory();
        break;
      default:
        process.stdout.write(textFormat('ERROR: Invalid input', 'red'));
        showCurrentDir();
        break;
    }
  }
});

process.on('SIGINT', () => {
  process.exit();
})
process.on('exit', () => {
  process.stdout.write(textFormat(`\nThank you for using File Manager, ${USERNAME}, goodbye!`));
})

function upDirectory() {
  dir = path.join(dir, '../'); 
  showCurrentDir();
}

function listDirectory() {
  fs.readdir(dir, { withFileTypes: true }).then((files) => {
    const tableStructure = [];
    files.forEach(file => tableStructure.push({
      name: file.name, 
      type: file.isFile() ? 'file' : 'directory'
    }));
    console.table(tableStructure);
    showCurrentDir();
  })
}

function showCurrentDir() {
  process.stdout.write(textFormat(`You are currently in ${dir}`, 'yellow'));
}

function getUsernameFromArgs(args) {
  const USERNAME_FLAG = args.find(el => el.includes('--username'));
  return USERNAME_FLAG ? USERNAME_FLAG.slice(11) : 'User';
}