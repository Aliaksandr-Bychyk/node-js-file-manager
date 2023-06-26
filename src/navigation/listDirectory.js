import { readdir } from 'node:fs/promises';

const listDirectory = async () => {
  await readdir(global.dir, { withFileTypes: true }).then((files) => {
    const tableStructure = [];
    files.forEach(file => tableStructure.push({
      name: file.name, 
      type: file.isFile() ? 'file' : 'directory'
    }));
    console.table(tableStructure);
  })
}

export default listDirectory;