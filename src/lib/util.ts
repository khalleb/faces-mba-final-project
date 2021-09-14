import path from 'path';

export function pathWindowsLinux(): string {
  const isWindows = path.sep === "\\" ? true : false;
  const pathFolder = `${isWindows ? '\\' : '/'}`;
  return pathFolder;
}