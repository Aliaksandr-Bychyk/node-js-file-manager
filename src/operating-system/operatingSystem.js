import { EOL, cpus, userInfo, homedir, arch } from 'node:os';
import printText from '../utils/printText.js';
import { invalidInput } from '../utils/errorMessages.js';

const getEndOfLine = () => {
  printText(JSON.stringify(EOL));
}
const getCpus = () => {
  printText(`This machine has ${cpus().length} cpus:`);
  cpus().map((cpu, index) => {
    printText(`${index + 1}. ${cpu.model.trim()} ${(cpu.speed / 1024).toFixed(3)} GHz`);
  })
}

const getHomedir = () => {
  printText(`Home directory: ${homedir()}`);
}

const getUsername = () => {
  printText(`System user name: ${userInfo().username}`);
}

const getArchitecture = () => {
  printText(`CPU architecture: ${arch}`)
}

const operatingSystem = async (input) => {
  const osFlags = [
    { name: '--EOL', function: () => getEndOfLine() },
    { name: '--cpus', function: () => getCpus() },
    { name: '--homedir', function: () => getHomedir() },
    { name: '--username', function: () => getUsername() },
    { name: '--architecture', function: () => getArchitecture() },
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