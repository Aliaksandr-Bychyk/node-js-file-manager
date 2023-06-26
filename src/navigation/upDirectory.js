import { join } from 'node:path';

const upDirectory = async () => {
  global.dir = join(global.dir, '../'); 
}

export default upDirectory;