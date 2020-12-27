import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export function touchDirSync(path: string) {
  if (!existsSync(path)) {
    touchDirSync(dirname(path));
    mkdirSync(path);
  }
}
