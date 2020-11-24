import * as fs from "fs";
import path from "path";
import { ProjectInfo } from "../typestack/ProjectInfo";

export class PlatformInfo {
  bundleDir = path.join(this.projectInfo.bundleDir, this.name);

  generatedDir = path.join(this.projectInfo.generatedDir, this.name);

  generatedIndexFileName = path.join(this.generatedDir, "index.ts");

  tsConfigBaseName = `tsconfig.${this.name}.json`;

  tsConfigFileName = path.join(this.projectInfo.rootDir, this.tsConfigBaseName);

  constructor(public projectInfo: ProjectInfo, public name: string) {}

  *findIndexDirNames() {
    for (const dirName of this.projectInfo.dirNames) {
      const indexDir = path.join(dirName, this.name);
      const indexFileName = path.join(indexDir, "index.ts");
      if (fs.existsSync(indexFileName)) {
        yield indexDir;
      }
    }
  }
}
