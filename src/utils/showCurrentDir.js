import printText from "./printText.js";

const showCurrentDir = () => {
  printText(`You are currently in ${global.dir}`, 'yellow');
}

export default showCurrentDir;