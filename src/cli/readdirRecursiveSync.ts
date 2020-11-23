import fs from "fs";
import { join } from "path";

export function* readdirRecursiveSync(
  path: string,
  options: {
    excludeDirs?: boolean;
    excludeFiles?: boolean;
    filterBaseName?: (baseName: string) => boolean;
  } = {}
) {
  for (const baseName of fs.readdirSync(path)) {
    if (options.filterBaseName) {
      if (!options.filterBaseName(baseName)) continue;
    }
    const fileName = join(path, baseName);
    if (fs.statSync(fileName).isDirectory()) {
      yield* readdirRecursiveSync(fileName, options);
      if (!(options.excludeDirs ?? true)) yield fileName;
    } else if (!(options.excludeFiles ?? false)) {
      yield fileName;
    }
  }
}
