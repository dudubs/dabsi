import fs from "fs";
import { join } from "path";

export function* readdirRecursiveSync(path: string) {
  for (const baseName of fs.readdirSync(path)) {
    const fileName = join(path, baseName);
    if (fs.statSync(fileName).isDirectory()) {
      yield* readdirRecursiveSync(fileName);
    } else {
      yield fileName;
    }
  }
}
