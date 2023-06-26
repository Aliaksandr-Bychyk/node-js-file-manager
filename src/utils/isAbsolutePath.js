const isAbsolutePath = (path) => {
  return path.includes(':') && path.includes('\\');
}

export default isAbsolutePath;