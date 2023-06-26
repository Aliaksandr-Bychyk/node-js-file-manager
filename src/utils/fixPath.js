import { join } from 'node:path';

const fixPath = (path) => {
  const fixedPath = path.replace(/\//g, '\\');
  return fixedPath.includes(':') && fixedPath.includes('\\') ? fixedPath : join(global.dir, fixedPath);
}

export default fixPath;