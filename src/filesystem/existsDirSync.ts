import { existsSync, statSync } from "fs";

export function existsDirSync(dirName: string) {
  return existsSync(dirName) && statSync(dirName).isDirectory();
}
