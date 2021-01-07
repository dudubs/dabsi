import getParentDirs from "@dabsi/filesystem/getParentDirs";
import { Stats, statSync } from "fs";
import path from "path";

export default function (
  dir: string,
  baseName: string,
  filter?: (stat: Stats) => boolean
) {
  for (const parentDir of getParentDirs(dir)) {
    let stat;
    const fileName = path.join(parentDir, baseName);
    try {
      stat = statSync(fileName);
    } catch {
      continue;
    }
    if (filter && !filter(stat)) continue;
    return fileName;
  }
}
