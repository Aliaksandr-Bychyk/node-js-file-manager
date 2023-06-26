import os from 'node:os';
import printText from '../utils/printText.js';
import { invalidInput, operationFailed } from '../utils/errorMessages.js';
import isAbsolutePath from '../utils/isAbsolutePath.js';

const endOfLine = () => {
  printText(JSON.stringify(os.EOL));
}
const cpus = () => {
  printText(`This machine has ${os.cpus().length} cpus:`);
  os.cpus().map((cpu, index) => {
    printText(`${index + 1}. ${cpu.model.trim()} ${(cpu.speed / 1024).toFixed(3)} GHz`);
  })
}

const homedir = () => {
  printText(`Home directory: ${os.homedir()}`);
}

const username = () => {
  printText(`System user name: ${os.userInfo().username}`);
}

const architecture = () => {
  printText(`CPU architecture: ${os.arch}`)
}

const operatingSystem = async (input) => {
  const osFlags = [
    { name: '--EOL', function: () => endOfLine() },
    { name: '--cpus', function: () => cpus() },
    { name: '--homedir', function: () => homedir() },
    { name: '--username', function: () => username() },
    { name: '--architecture', function: () => architecture() },
  ]
  if (input.length >= 2) {
    if (osFlags.filter(e => e.name === input[1]).length > 0) {
      osFlags.map(async (flag) => {
        if (flag.name === input[1]) {
          await flag.function();
        }
      });
    } else {
      invalidInput();
    }
  } else {
    invalidInput();
  }

}

export default operatingSystem;